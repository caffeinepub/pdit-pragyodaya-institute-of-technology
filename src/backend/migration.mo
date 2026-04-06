import Map "mo:core/Map";
import Time "mo:core/Time";

module {
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

  type Course = {
    id : Nat;
    title : Text;
    subtitle : Text;
    description : Text;
    duration : Text;
    fee : Text;
    badge : Text;
    topics : [Text];
    colorKey : Text;
    isActive : Bool;
  };

  type BrochureRequest = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    courseId : Nat;
    courseName : Text;
    timestamp : Int;
  };

  type OldActor = {
    admissions : [AdmissionRecord];
    admissionCounter : Nat;
    franchiseInquiries : [FranchiseRecord];
    franchiseCounter : Nat;
    contactMessages : [ContactRecord];
    contactCounter : Nat;
    userIdCounter : Nat;
    users : Map.Map<Text, UserProfile>;
    userPrincipals : Map.Map<Text, Principal>;
    announcements : Map.Map<Nat, Announcement>;
    announcementCounter : Nat;
  };

  type NewActor = {
    admissions : [AdmissionRecord];
    admissionCounter : Nat;
    franchiseInquiries : [FranchiseRecord];
    franchiseCounter : Nat;
    contactMessages : [ContactRecord];
    contactCounter : Nat;
    userIdCounter : Nat;
    users : Map.Map<Text, UserProfile>;
    userPrincipals : Map.Map<Text, Principal>;
    announcements : Map.Map<Nat, Announcement>;
    announcementCounter : Nat;
    courses : Map.Map<Nat, Course>;
    maxCourseId : Nat;
    brochureRequests : Map.Map<Nat, BrochureRequest>;
    maxBrochureRequestId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let courses = Map.fromIter<Nat, Course>([( 1, {
      id = 1;
      title = "Web Development";
      subtitle = "Frontend & Backend";
      description = "Learn HTML, CSS, JavaScript, PHP, MySQL, Laravel, and more. Master both frontend and backend development with practical projects and real-world applications. Whether you`re a beginner or looking to enhance your skills, this course covers everything from basics to advanced techniques.";
      duration = "8+ Months";
      fee = "₹38,000";
      badge = "web-dev";
      topics = ["HTML5 & CSS3", "JavaScript ES6+","PHP & MySQL", "Laravel Framework","Git & Deployment","WordPress Development"];
      colorKey = "#0067B0";
      isActive = true;
    } ), ( 2, {
      id = 2;
      title = "Full Stack Development";
      subtitle = "Comprehensive Coding";
      description = "Become a full stack developer by learning both frontend and backend technologies. This course covers HTML, CSS, JavaScript, PHP, MySQL, Laravel, project management, and hands-on experience with coding projects. Perfect for those aiming to build complete web applications from scratch.";
      duration = "10+ Months";
      fee = "₹48,000";
      badge = "full-stack";
      topics = ["Complete Web Development","Backend with Laravel","Advanced JavaScript", "Database Management", "Server Deployment","Project Management"];
      colorKey = "#F7C002";
      isActive = true;
    } ), ( 3, {
      id = 3;
      title = "Digital Marketing";
      subtitle = "Online Promotion";
      description = "Master the art of digital marketing by learning SEO, Google Ads, social media marketing, content creation, and analytics tools. This course is designed to help you create effective online campaigns and drive business growth through digital channels.";
      duration = "5+ Months";
      fee = "₹28,000";
      badge = "digital-marketing";
      topics = ["SEO & SEM","Google Ads Mastery","Social Media Marketing", "Content Creation", "Analytics Tools","Email Marketing"];
      colorKey = "#F03B2F";
      isActive = true;
    } ), ( 4, {
      id = 4;
      title = "Graphic Design";
      subtitle = "Creative Arts";
      description = "Unleash your creativity with our comprehensive graphic design course. Learn Adobe Photoshop, Illustrator, CorelDRAW, and other design software. Develop skills in logo design, branding, digital art, and multimedia projects.";
      duration = "8+ Months";
      fee = "₹28,000";
      badge = "graphic-design";
      topics = ["Adobe Photoshop & Illustrator","Logo & Branding Design","CorelDRAW Mastery", "Digital Art Creation","Marketing Designs"];
      colorKey = "#097D61";
      isActive = true;
    } ), ( 5, {
      id = 5;
      title = "Computer Applications";
      subtitle = "Basic to Advanced";
      description = "Gain essential computer skills including MS Office, advanced Excel, Tally ERP 9, and internet navigation. This course is perfect for beginners and professionals looking to enhance their productivity and technical expertise.";
      duration = "8+ Months";
      fee = "₹22,000";
      badge = "computer-applications";
      topics = ["MS Office Suite","Excel Advanced Functions","Tally ERP 9","Internet Navigation","Productivity Hacks"];
      colorKey = "#846B27";
      isActive = true;
    } ), ( 6, {
      id = 6;
      title = "Freelancing Skills";
      subtitle = "Professional Work";
      description = "Learn how to start and grow a successful freelancing career. Topics include business setup, client management, project bidding, pricing strategies, communication skills, and building an impressive portfolio.";
      duration = "25 Days";
      fee = "₹7,000";
      badge = "freelancing";
      topics = ["Business Setup","Client Management","Communication Skills","Pitching & Bidding","Portfolio Building","Internet Marketing"];
      colorKey = "#706974";
      isActive = true;
    } )].values());

    {
      old with
      courses;
      maxCourseId = 6;
      brochureRequests = Map.empty<Nat, BrochureRequest>();
      maxBrochureRequestId = 0;
    };
  };
};
