import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Specify migration in with clause
(with migration = Migration.run)
actor {
  // Initialize authorisation with role-based access control (see scripts/init.sh)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  type AdmissionRecord = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    course : Text;
    city : Text;
    message : Text;
    timestamp : Int;
  };

  type FranchiseRecord = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    city : Text;
    investment : Text;
    message : Text;
    timestamp : Int;
  };

  type ContactRecord = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  type UserProfile = {
    id : Nat;
    username : Text;
    password : Text; // Note: Storing plain text passwords, not secure for production
    fullName : Text;
    email : Text;
    phone : Text;
    course : Text;
    enrolledDate : Int;
    role : Text; // "student" or "admin"
    progress : Nat;
    isActive : Bool;
  };

  type Announcement = {
    id : Nat;
    title : Text;
    content : Text;
    postedBy : Text;
    timestamp : Int;
  };

  // Admissions
  var admissions : [AdmissionRecord] = [];
  var admissionCounter = 0;

  // Public endpoint - anyone can submit admission
  public shared ({ caller }) func submitAdmission(name : Text, phone : Text, email : Text, course : Text, city : Text, message : Text) : async { ok : Nat } {
    admissionCounter += 1;
    let record : AdmissionRecord = {
      id = admissionCounter;
      name;
      phone;
      email;
      course;
      city;
      message;
      timestamp = Time.now();
    };
    admissions := admissions.concat([record]);
    { ok = admissionCounter };
  };

  // Admin-only endpoint
  public query ({ caller }) func getAdmissions() : async { ok : [AdmissionRecord] } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view admissions");
    };
    { ok = admissions };
  };

  // Franchise Inquiries
  var franchiseInquiries : [FranchiseRecord] = [];
  var franchiseCounter = 0;

  // Public endpoint - anyone can submit franchise inquiry
  public shared ({ caller }) func submitFranchiseInquiry(name : Text, phone : Text, email : Text, city : Text, investment : Text, message : Text) : async { ok : Nat } {
    franchiseCounter += 1;
    let record : FranchiseRecord = {
      id = franchiseCounter;
      name;
      phone;
      email;
      city;
      investment;
      message;
      timestamp = Time.now();
    };
    franchiseInquiries := franchiseInquiries.concat([record]);
    { ok = franchiseCounter };
  };

  // Admin-only endpoint
  public query ({ caller }) func getFranchiseInquiries() : async { ok : [FranchiseRecord] } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view franchise inquiries");
    };
    { ok = franchiseInquiries };
  };

  // Contact Messages
  var contactMessages : [ContactRecord] = [];
  var contactCounter = 0;

  // Public endpoint - anyone can submit contact
  public shared ({ caller }) func submitContact(name : Text, email : Text, phone : Text, message : Text) : async { ok : Nat } {
    contactCounter += 1;
    let record : ContactRecord = {
      id = contactCounter;
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contactMessages := contactMessages.concat([record]);
    { ok = contactCounter };
  };

  // Admin-only endpoint
  public query ({ caller }) func getContactMessages() : async { ok : [ContactRecord] } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    { ok = contactMessages };
  };

  // User Management
  var userIdCounter = 2;
  var users = Map.fromIter<Text, UserProfile>([( "admin", {
    id = 1;
    username = "admin";
    password = "admin123";
    fullName = "Admin User";
    email = "admin@example.com";
    phone = "1234567890";
    course = "";
    enrolledDate = Time.now();
    role = "admin";
    progress = 0;
    isActive = true;
  } ), ( "student", {
    id = 2;
    username = "student";
    password = "student123";
    fullName = "Demo Student";
    email = "student@example.com";
    phone = "0987654321";
    course = "Web Development";
    enrolledDate = Time.now();
    role = "student";
    progress = 0;
    isActive = true;
  } )].values());
  
  // Map username to Principal for authorization
  var userPrincipals = Map.empty<Text, Principal>();

  // Public endpoint - anyone can register
  public shared ({ caller }) func registerUser(username : Text, password : Text, fullName : Text, email : Text, phone : Text, course : Text) : async { ok : UserProfile } {
    if (users.containsKey(username)) {
      Runtime.trap("Username already exists");
    };
    userIdCounter += 1;
    let newUser : UserProfile = {
      id = userIdCounter;
      username;
      password;
      fullName;
      email;
      phone;
      course;
      enrolledDate = Time.now();
      role = "student";
      progress = 0;
      isActive = true;
    };
    users.add(username, newUser);
    userPrincipals.add(username, caller);
    // Assign user role in access control
    AccessControl.assignRole(accessControlState, caller, caller, #user);
    { ok = newUser };
  };

  // Public endpoint - anyone can login (authentication, not authorisation)
  public query ({ caller }) func loginUser(username : Text, password : Text) : async { ok : UserProfile } {
    switch (users.get(username)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) {
        if (user.password == password) {
          { ok = user }
        } else {
          Runtime.trap("Invalid credentials");
        };
      };
    };
  };

  // Authenticated endpoint - users can view their own profile, admins can view any
  public query ({ caller }) func getUserProfile(username : Text) : async { ok : UserProfile } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };

    switch (users.get(username)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) {
        // Check if caller is viewing their own profile or is admin
        let isOwnProfile = switch (userPrincipals.get(username)) {
          case (null) { false };
          case (?userPrincipal) { Principal.equal(caller, userPrincipal) };
        };

        if (not isOwnProfile and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own profile");
        };

        { ok = user };
      };
    };
  };

  // Authenticated endpoint - users can update their own profile, admins can update any
  public shared ({ caller }) func updateUserProfile(username : Text, fullName : Text, email : Text, phone : Text) : async { ok : UserProfile } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update profiles");
    };

    switch (users.get(username)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) {
        // Check if caller is updating their own profile or is admin
        let isOwnProfile = switch (userPrincipals.get(username)) {
          case (null) { false };
          case (?userPrincipal) { Principal.equal(caller, userPrincipal) };
        };

        if (not isOwnProfile and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own profile");
        };

        let updatedUser : UserProfile = {
          id = user.id;
          username = user.username;
          password = user.password;
          fullName;
          email;
          phone;
          course = user.course;
          enrolledDate = user.enrolledDate;
          role = user.role;
          progress = user.progress;
          isActive = user.isActive;
        };
        users.add(username, updatedUser);
        { ok = updatedUser };
      };
    };
  };

  // Admin-only endpoint
  public query ({ caller }) func getAllStudents() : async { ok : [UserProfile] } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all students");
    };
    { ok = users.values().filter(func(user) { user.role == "student" }).toArray(); };
  };

  // Admin-only endpoint
  public shared ({ caller }) func updateStudentProgress(username : Text, progress : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update student progress");
    };

    switch (users.get(username)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) {
        let updatedUser : UserProfile = {
          id = user.id;
          username = user.username;
          password = user.password;
          fullName = user.fullName;
          email = user.email;
          phone = user.phone;
          course = user.course;
          enrolledDate = user.enrolledDate;
          role = user.role;
          progress;
          isActive = user.isActive;
        };
        users.add(username, updatedUser);
        true;
      };
    };
  };

  // Authenticated endpoint - students view their own, admins view any
  public query ({ caller }) func getStudentProgress(username : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view progress");
    };

    switch (users.get(username)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) {
        // Check if caller is viewing their own progress or is admin
        let isOwnProfile = switch (userPrincipals.get(username)) {
          case (null) { false };
          case (?userPrincipal) { Principal.equal(caller, userPrincipal) };
        };

        if (not isOwnProfile and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own progress");
        };

        user.progress;
      };
    };
  };

  // Announcements
  var announcements = Map.fromIter<Nat, Announcement>([( 1, {
    id = 1;
    title = "Welcome to PDIT";
    content = "We are excited to have you on board!";
    postedBy = "admin";
    timestamp = Time.now();
  } ), ( 2, {
    id = 2;
    title = "New Course Launch";
    content = "Check out our new Web Development course.";
    postedBy = "admin";
    timestamp = Time.now();
  } ), ( 3, {
    id = 3;
    title = "Holiday Notice";
    content = "Institute will be closed on national holidays.";
    postedBy = "admin";
    timestamp = Time.now();
  } )].values());

  var announcementCounter = 3;

  // Admin-only endpoint
  public shared ({ caller }) func addAnnouncement(title : Text, content : Text, postedBy : Text) : async { ok : Nat } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add announcements");
    };

    announcementCounter += 1;
    let newAnnouncement : Announcement = {
      id = announcementCounter;
      title;
      content;
      postedBy;
      timestamp = Time.now();
    };
    announcements.add(announcementCounter, newAnnouncement);
    { ok = announcementCounter };
  };

  // Authenticated endpoint - all authenticated users can view announcements
  public query ({ caller }) func getAnnouncements() : async { ok : [Announcement] } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view announcements");
    };
    { ok = announcements.values().toArray() };
  };
};
