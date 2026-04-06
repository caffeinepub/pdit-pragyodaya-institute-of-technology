import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
  type OldAdmissionRecord = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    course : Text;
    city : Text;
    message : Text;
    timestamp : Int;
  };

  type OldFranchiseRecord = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    city : Text;
    investment : Text;
    message : Text;
    timestamp : Int;
  };

  type OldContactRecord = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  type OldActor = {
    admissions : [OldAdmissionRecord];
    admissionCounter : Nat;
    franchiseInquiries : [OldFranchiseRecord];
    franchiseCounter : Nat;
    contactMessages : [OldContactRecord];
    contactCounter : Nat;
  };

  type UserProfile = {
    id : Nat;
    username : Text;
    password : Text;
    fullName : Text;
    email : Text;
    phone : Text;
    course : Text;
    enrolledDate : Int;
    role : Text;
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

  type NewActor = {
    admissions : [OldAdmissionRecord];
    admissionCounter : Nat;
    franchiseInquiries : [OldFranchiseRecord];
    franchiseCounter : Nat;
    contactMessages : [OldContactRecord];
    contactCounter : Nat;
    userIdCounter : Nat;
    users : Map.Map<Text, UserProfile>;
    announcements : Map.Map<Nat, Announcement>;
    announcementCounter : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let usersEntries = [( "admin", {
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
    } )];
    let users = Map.fromIter<Text, UserProfile>(usersEntries.values());

    let announcementsEntries = [( 1, {
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
    } )];
    let announcements = Map.fromIter<Nat, Announcement>(announcementsEntries.values());

    {
      admissions = old.admissions;
      admissionCounter = old.admissionCounter;
      franchiseInquiries = old.franchiseInquiries;
      franchiseCounter = old.franchiseCounter;
      contactMessages = old.contactMessages;
      contactCounter = old.contactCounter;
      userIdCounter = 2;
      users;
      announcements;
      announcementCounter = 3;
    };
  };
};
