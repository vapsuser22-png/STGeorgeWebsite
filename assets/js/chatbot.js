/**
 * St. George's School Unit-II, Agra
 * AI-Powered Website Navigation Chatbot Engine
 *
 * Grounded in the official school prospectus, syllabus, guidelines, and facilities.
 * Features:
 * - Natural Language Understanding with typo tolerance (Levenshtein distance)
 * - Smart Click-to-Navigate action buttons for every intent
 * - Session history memory with LocalStorage
 * - Contextual follow-up understanding
 * - Dynamic quick-reply chips
 * - Auto DOM injection across all pages
 */

(function () {
  'use strict';

  /* ==============================================================
     # 1. Official School Knowledge Base Registry
     ============================================================== */
  const KNOWLEDGE_BASE = [
    {
      id: 'admission',
      title: 'Admissions & Registration',
      keywords: [
        'admission', 'admissions', 'apply', 'applying', 'enroll', 'enrollment',
        'registration', 'register', 'nur-kg', 'nursery', 'kg', 'kindergarten',
        'entry', 'form', 'seat', 'criteria', 'eligibility', 'age limit', 'test',
        'interview', 'interaction', 'documents required', 'birth certificate', 'tc',
        'transfer certificate', 'online admission', 'admission process', 'how to apply'
      ],
      response: `<strong>Admissions at St. George's School Unit-II</strong><br><br>
We welcome new applicants for the upcoming academic session! Admissions are granted based on seat availability and age eligibility as per Council norms.<br><br>
&bull; <strong>Nur &amp; KG:</strong> Online temporary registration is active.<br>
&bull; <strong>Primary &amp; High School:</strong> Interaction and verification of academic records &amp; Transfer Certificate (TC).<br>
&bull; <strong>Required Documents:</strong> Municipal Birth Certificate, recent passport photos, previous report card, and TC.`,
      actions: [
        { label: 'Nur-KG Admission Link (Temporary)', url: 'contact.html', icon: 'bi-pencil-square', primary: true },
        { label: 'View Admission Procedure', url: 'index.html#admissions', icon: 'bi-file-earmark-text', primary: false },
        { label: 'Fee Rules & Schedule', url: 'index.html#admissions', icon: 'bi-receipt', primary: false }
      ],
      quickReplies: ['Fee structure', 'School Uniform', 'Contact office', 'Campus facilities']
    },

    {
      id: 'fees',
      title: 'School Fees & Rules',
      keywords: [
        'fee', 'fees', 'feez', 'tuition', 'cost', 'charge', 'charges', 'installment',
        'quarterly', 'payment', 'pay fees', 'due date', 'late fee', 'concession',
        'structure', 'expense', 'fee rules', 'receipt', 'online fee'
      ],
      response: `<strong>Fee Rules &amp; Schedule</strong><br><br>
School fees are payable as per the schedule prescribed by the Diocese Education Board and the School Management:<br><br>
&bull; Fees must be deposited within the stipulated quarterly due dates to avoid late payment charges.<br>
&bull; Fee slips and anecdotal records are maintained in the student diary.<br>
&bull; For exact class-wise fee slabs and payment modes, please visit the Accounts Desk or view our fee guidelines.`,
      actions: [
        { label: 'View Fee Rules & Details', url: 'index.html#admissions', icon: 'bi-receipt-cutoff', primary: true },
        { label: 'Contact School Accounts Desk', url: 'contact.html', icon: 'bi-telephone', primary: false }
      ],
      quickReplies: ['Admission procedure', 'School calendar', 'Principal message']
    },

    {
      id: 'academics',
      title: 'Academics, Curriculum & Streams',
      keywords: [
        'academic', 'academics', 'curriculum', 'cisce', 'icse', 'isc', 'syllabus',
        'council', 'board', 'stream', 'streams', 'science', 'commerce', 'subject',
        'subjects', 'course', 'courses', 'studies', 'study', 'class', 'classes',
        'pcm', 'pcb', 'physics', 'chemistry', 'biology', 'maths', 'mathematics',
        'accounts', 'economics', 'english', 'computer science'
      ],
      response: `<strong>Academics &amp; CISCE Curriculum</strong><br><br>
St. George's School Unit-II is affiliated with the <strong>Council for the Indian School Certificate Examinations (CISCE), New Delhi</strong> (School Code: <strong>UP386</strong>).<br><br>
We offer comprehensive academic tracks:<br>
&bull; <strong>Science Stream:</strong> Physics, Chemistry, Biology / Mathematics, Computer Science, English.<br>
&bull; <strong>Commerce Stream:</strong> Accounts, Commerce, Economics, Business Studies / Mathematics, English.<br>
&bull; Integrated smart classroom teaching, laboratory practicals, and continuous evaluations.`,
      actions: [
        { label: 'Explore CISCE Curriculum', url: 'courses.html', icon: 'bi-journal-text', primary: true },
        { label: 'View Academic Streams', url: 'index.html#academics', icon: 'bi-mortarboard', primary: false },
        { label: 'Campus Facilities', url: 'index.html#facilities', icon: 'bi-building', primary: false }
      ],
      quickReplies: ['Science stream', 'Commerce stream', 'School calendar', 'Robotics lab']
    },

    {
      id: 'wings',
      title: 'School Wings (KG, Primary, High School)',
      keywords: [
        'kindergarten', 'kinder garten', 'kg', 'nursery', 'prep', 'play area',
        'primary', 'primary school', 'middle school', 'high school', 'secondary',
        'senior secondary', 'wings', 'grades'
      ],
      response: `<strong>Distinct Academic Wings</strong><br><br>
Our school campus is structured into dedicated, age-appropriate learning divisions:<br><br>
&bull; <strong>Kindergarten Wing:</strong> Safe, colorful play areas with experiential phonics, storytelling &amp; activity-based foundational learning.<br>
&bull; <strong>Primary Wing:</strong> Building strong conceptual literacy, numeracy, creative expression, and curiosity.<br>
&bull; <strong>High School Wing:</strong> Specialized subject labs, dedicated CISCE board preparation, and career mentoring.`,
      actions: [
        { label: 'Primary School Wing', url: 'PrimarySchool.html', icon: 'bi-mortarboard', primary: true },
        { label: 'Primary School Wing', url: 'PrimarySchool.html', icon: 'bi-book', primary: false },
        { label: 'High School Wing', url: 'HighSchool.html', icon: 'bi-mortarboard', primary: false }
      ],
      quickReplies: ['Curriculum CISCE', 'Facilities', 'Admissions']
    },

    {
      id: 'facilities',
      title: 'Campus Facilities',
      keywords: [
        'facility', 'facilities', 'facilties', 'infrastructure', 'building', 'campus',
        'classroom', 'classrooms', 'smart class', 'lab', 'labs', 'laboratory',
        'science lab', 'computer lab', 'library', 'books', 'infirmary', 'doctor',
        'medical', 'first aid', 'hall', 'multipurpose', 'auditorium', 'field',
        'playground', 'ground', 'sports field', 'parking', 'bicycle', 'cycle'
      ],
      response: `<strong>World-Class Campus Facilities</strong><br><br>
St. George's School Unit-II stretches over acres of prime land at Bagh Muzaffar Khan, featuring 10 key facilities:<br><br>
1. <strong>Spacious Classrooms:</strong> Well-ventilated and equipped with smart audiovisual teaching tools.<br>
2. <strong>Science Labs:</strong> Dedicated Senior Physics, Chemistry, and Biology laboratories equipped with optical benches and precision apparatus.<br>
3. <strong>AI &amp; Robotics Lab:</strong> Hands-on robotics kits, sensors, and coding platforms.<br>
4. <strong>Computer Labs:</strong> High-speed internet with modern computer terminals.<br>
5. <strong>Rich Library:</strong> Serene reading hall lined with curated reference books, encyclopedias, literature, and periodicals.<br>
6. <strong>Infirmary:</strong> Trained healthcare staff providing prompt first-aid and medical care.<br>
7. <strong>Multi-Purpose Hall:</strong> Stage for cultural events, assemblies, and competitions.<br>
8. <strong>Play Area for KG:</strong> Child-safe outdoor slides and play gear.<br>
9. <strong>Full Size Field:</strong> Expansive ground for football, cricket, and athletics.<br>
10. <strong>Student Bicycle Parking:</strong> Safe on-premises designated parking for bicycles.`,
      actions: [
        { label: 'View All Campus Facilities', url: 'index.html#facilities', icon: 'bi-building-check', primary: true },
        { label: 'Library & Labs Gallery', url: 'gallery.html#academic-facilities', icon: 'bi-book-half', primary: false },
        { label: 'Campus Facilities', url: 'index.html#facilities', icon: 'bi-building', primary: false }
      ],
      quickReplies: ['Library & labs', 'AI & Robotics lab', 'Sports field', 'Bicycle parking']
    },

    {
      id: 'national_fete',
      title: "Annual National Fete & Children's Day Carnival",
      keywords: [
        'fete', 'national fete', 'nationalfete', 'carnival', "children's day", 'childrens day',
        'vikash kumar', 'ips', 'chief guest', 'autograph', 'kulhad chai', 'pakora',
        '1090', 'women power line', 'mission shakti', 'police mascot', 'safety awareness',
        'food stall', 'stalls', 'game stall', 'games stall', 'ping pong', 'water pong', 'ring toss',
        'spin the wheel', 'fishing the coke', 'brain teaser', 'unlock me', 'fair', 'mela', 'fun fair'
      ],
      response: `<strong>Annual National Fete &amp; Children's Day Carnival</strong><br><br>
The National Fete is one of the most anticipated annual community celebrations at St. George's School Unit-II:<br><br>
&bull; <strong>Chief Guest Inauguration:</strong> Inaugurated by Chief Guest <strong>Mr. Vikash Kumar (IPS)</strong> and Principal <strong>Mr. Ashish Paul Habil</strong> with floral felicitation and keynote address.<br>
&bull; <strong>UP Police 1090 Safety Awareness:</strong> Special assembly featuring the UP Police Women Power Line 1090 mascot and women police officers promoting student safety and empowerment.<br>
&bull; <strong>Youth Mentorship &amp; Autographs:</strong> IPS Vikash Kumar interacting with students, signing notebooks, and encouraging academic excellence.<br>
&bull; <strong>15+ Exciting Pavilions:</strong> Vibrant booths spanning traditional Kulhad Chai &amp; Pakoras, Queen's Kitchen (VIP food tasting of hot Chola Bhatura), Indian Chaat Corner (Gol Gappe, Bhel Puri, Kheer, Chowmein), and Bakery Sweet Treats.<br>
&bull; <strong>Skill &amp; Mind Games:</strong> Spin-The-Wheel, Water Pong &amp; Ring Toss (Stall 13), Fishing the Coke bottle challenge, Ping Pong cup toss, and Brain Teaser &ldquo;Unlock Me&rdquo; padlock puzzles.<br>
&bull; <strong>Joyous Community Spirit:</strong> Celebrated across the lush green campus lawns with music and fellowship.`,
      actions: [
        { label: 'View National Fete Gallery (17 Photos)', url: 'gallery.html#national-fete', icon: 'bi-balloon-heart', primary: true },
        { label: 'Annual Events', url: 'events.html', icon: 'bi-calendar-event', primary: false },
        { label: 'Campus Activities', url: 'index.html#activities', icon: 'bi-stars', primary: false }
      ],
      quickReplies: ['National fete', 'Annual Day', 'Campus facilities']
    },

    {
      id: 'music_performing_arts',
      title: 'Music Studio & Performing Arts',
      keywords: [
        'music', 'musical', 'song', 'singing', 'choir', 'carol', 'choral',
        'guitar', 'guitars', 'keyboard', 'keyboards', 'synthesizer', 'piano',
        'instrument', 'instruments', 'performing arts', 'band', 'orchestra'
      ],
      response: `<strong>Music Studio &amp; Performing Arts</strong><br><br>
Music and performing arts are integral to student life at St. George's School Unit-II:<br><br>
&bull; <strong>Instrumental Mastery:</strong> Comprehensive hands-on instruction in acoustic guitar fretwork, chord progressions, and Yamaha electronic keyboard synthesizers.<br>
&bull; <strong>Choral &amp; Vocal Harmony:</strong> The celebrated St. George's School Choir presents uplifting hymns and anthems for Annual Day and Christmas services.<br>
&bull; <strong>Stage Performance:</strong> Georgians regularly perform at annual cultural showcases, inter-house festivals, and the prestigious "Georgians of the School" title competitions.`,
      actions: [
        { label: 'View Music Gallery', url: 'gallery.html#music-performing-arts', icon: 'bi-music-note-beamed', primary: true },
        { label: 'Annual Day & Events', url: 'events.html', icon: 'bi-calendar-event', primary: false },
        { label: 'Campus Activities', url: 'index.html#activities', icon: 'bi-stars', primary: false }
      ],
      quickReplies: ['School choir', 'Campus facilities', 'Annual Day']
    },

    {
      id: 'academic_facilities',
      title: 'School Library & Science Laboratories',
      keywords: [
        'library', 'libraries', 'reading hall', 'reading room', 'book', 'books', 'periodical', 'journal',
        'physics lab', 'science lab', 'optics', 'practical', 'practicals', 'chemistry lab', 'biology lab',
        'laboratory', 'laboratories', 'experiment', 'experiments'
      ],
      response: `<strong>School Library &amp; Senior Science Laboratories</strong><br><br>
St. George's School Unit-II fosters academic excellence and scientific inquiry through world-class learning spaces:<br><br>
&bull; <strong>Library &amp; Reading Hall:</strong> A quiet sanctuary with custom reading carrels, comprehensive CISCE reference textbooks, encyclopedias, fiction, journals, and a computerized catalog managed by professional library staff.<br>
&bull; <strong>Senior Physics Laboratory:</strong> Advanced facility equipped with precision optical benches, ray tracing and lens mounts, electrical and magnetism stations for ICSE/ISC Board practicals.<br>
&bull; <strong>Chemistry &amp; Biology Laboratories:</strong> Fully appointed workstations with precision apparatus, reagents, and biological specimens supporting experiential learning.`,
      actions: [
        { label: 'View Facilities Gallery', url: 'gallery.html#academic-facilities', icon: 'bi-images', primary: true },
        { label: 'All Campus Facilities', url: 'index.html#facilities', icon: 'bi-building-check', primary: false },
        { label: 'Science Stream (PCMB/PCMC)', url: 'courses.html', icon: 'bi-mortarboard', primary: false }
      ],
      quickReplies: ['Science stream', 'Campus facilities', 'Senior school']
    },

    {
      id: 'robotics_steam',
      title: 'AI, Robotics & STEAM Education',
      keywords: [
        'robotics', 'robotic', 'robot', 'ai', 'artificial intelligence', 'steam', 'stem',
        'coding', 'technology', 'maker lab', 'tinkering', 'programming', 'innovation'
      ],
      response: `<strong>AI &amp; Robotics and STEAM Education</strong><br><br>
We prepare Georgians for 21st-century technological leadership through our state-of-the-art AI &amp; Robotics and STEAM curriculum.<br><br>
Students engage in hands-on building of intelligent models, sensor programming, algorithmic problem-solving, and scientific tinkering under expert guidance.`,
      actions: [
        { label: 'Campus Facilities', url: 'index.html#facilities', icon: 'bi-building', primary: true },
        { label: 'Campus Facilities', url: 'index.html#facilities', icon: 'bi-building', primary: false }
      ],
      quickReplies: ['Facilities', 'CISCE Curriculum', 'Admissions']
    },

    {
      id: 'fancy_dress',
      title: 'Kindergarten Fancy Dress & Stage Events',
      keywords: [
        'fancy dress', 'fancy dresses', 'fancy dress competition', 'costume', 'costumes',
        'dress up', 'chandrayaan', 'isro', 'astronaut', 'choir', 'stage dance',
        'kindergarten fancy dress', 'dress competition'
      ],
      response: `<strong>Kindergarten Fancy Dress Competition &amp; Celebrations</strong><br><br>
St. George's School Unit-II proudly celebrates its vibrant <strong>Annual Fancy Dress Competition</strong>! Our young Georgians step into character with confidence, imagination, and joy:<br><br>
&bull; <strong>Young Leaders &amp; Personas:</strong> Judges, airline pilots, master chefs, teachers, princesses, and cultural attire.<br>
&bull; <strong>Community Guardians:</strong> Frontline healthcare doctors with first-aid kits, police officers, military forces, and defense commanders.<br>
&bull; <strong>ISRO Chandrayaan Mission:</strong> Space rockets, lunar landers, and young astronauts celebrating Indian science.<br>
&bull; <strong>School Choir &amp; Stage Dance:</strong> Musical choral anthems and rhythmic stage performances.`,
      actions: [
        { label: 'View Fancy Dress Gallery', url: 'gallery.html#fancy-dress', icon: 'bi-stars', primary: true },
        { label: 'Explore Photo Gallery', url: 'gallery.html', icon: 'bi-images', primary: false },
        { label: 'School Events & Activities', url: 'events.html', icon: 'bi-calendar-event', primary: false }
      ],
      quickReplies: ['Photo Gallery', 'Kindergarten Wing', 'Campus Facilities', 'Admissions']
    },

    {
      id: 'football_tournament',
      title: 'CISCE Regional Football Tournament',
      keywords: [
        'football', 'football tournament', 'soccer', 'regional tournament', 'floodlight',
        'sports turf', 'football field', 'sports field', 'match', 'matches', 'championship',
        'sports ground', 'cisce football', 'cisce sports', 'football match', 'football team'
      ],
      response: `<strong>CISCE Regional Football Tournament (Floodlight Championship)</strong><br><br>
St. George's School Unit-II proudly hosted the prestigious <strong>CISCE Regional Football Tournament</strong> under high-mast stadium floodlights on our championship full-size sports turf!<br><br>
&bull; <strong>Opening Ceremony &amp; Felicitations:</strong> Principal Mr. Ashish Paul Habil and esteemed Chief Guest greeted the participating regional teams on the pitch before kickoff.<br>
&bull; <strong>High-Octane Match Action:</strong> Intense dribbling, tactical defending, and teamwork displayed under stadium lighting.<br>
&bull; <strong>Championship Glory:</strong> The Georgian girls' football squad clinched an inspiring victory, celebrating in a triumphant huddle with our heritage campus illuminated in the background.`,
      actions: [
        { label: 'View Football Gallery', url: 'gallery.html#football-tournament', icon: 'bi-trophy-fill', primary: true },
        { label: 'Tournament Details', url: 'events.html', icon: 'bi-calendar-event', primary: false },
        { label: 'Sports Ground Facilities', url: 'index.html#facilities', icon: 'bi-bounding-box', primary: false }
      ],
      quickReplies: ['Photo Gallery', 'National Sports Day', 'Campus Facilities', 'Activities & Sports']
    },

    {
      id: 'national_sports_day',
      title: 'Annual National Sports Day & Track Athletics',
      keywords: [
        'sports day', 'national sports day', 'sportsday', 'athletics', 'track and field',
        'three legged race', 'three-legged race', 'sack race', 'gunny sack race', 'bora race',
        'house march', 'inter house', 'inter-house', 'sports meet', 'athletic meet',
        'pt', 'mass pt', 'physical training', 'calisthenics', 'aerobics', 'stretching drill',
        'four houses', 'dhyan chand', 'race', 'races', 'sprint'
      ],
      response: `<strong>Annual National Sports Day &amp; Track Athletics Extravaganza</strong><br><br>
In tribute to National Sports Day and Major Dhyan Chand's legacy, St. George's School Unit-II organizes a high-spirited annual athletics championship on our lush green sports grounds:<br><br>
&bull; <strong>Grand Inter-House Gathering:</strong> The Georgian student body assembled in official house sportswear (Emerald Green, Gold Yellow, Scarlet Red, and Royal Blue) for the opening sports meet assembly and house march in the school quadrangle.<br>
&bull; <strong>Mass PT &amp; Aerobic Drills:</strong> Hundreds of senior and junior students performing synchronized aerobic stretches, calisthenics, and geometric fitness drills in unison.<br>
&bull; <strong>Girls' Gunny Sack Race:</strong> An exhilarating test of agility, balance, and speed as female athletes hop towards the finish line ribbon amidst roaring cheers.<br>
&bull; <strong>Three-Legged Partner Sprints:</strong> Dynamic partner races testing teamwork, communication, and synchronization across the cone-marked grass turf.<br>
&bull; <strong>Celebration of Fitness &amp; Fair Play:</strong> Fostering athletic grit, Olympic spirit, and healthy competition across all class levels.`,
      actions: [
        { label: 'View National Sports Day Gallery (8 Photos)', url: 'gallery.html#national-sports-day', icon: 'bi-flag-fill', primary: true },
        { label: 'Annual Events', url: 'events.html', icon: 'bi-calendar-event', primary: false },
        { label: 'Sports Facilities', url: 'index.html#activities', icon: 'bi-trophy', primary: false }
      ],
      quickReplies: ['National Sports Day', 'Football Tournament', 'Activities & Sports', 'Annual Events']
    },

    {
      id: 'activities',
      title: 'Activities, Sports & Co-Curricular',
      keywords: [
        'activity', 'activities', 'sport', 'sports', 'game', 'games', 'co-curricular',
        'extracurricular', 'tournament', 'tournaments', 'cisce tournament', 'annual day',
        'annual function', 'exhibition', 'science exhibition', 'house', 'houses',
        'house activity', 'inter house', 'motivational talk', 'university fair',
        'career counselling', 'health talk', 'check up', 'training session', 'athletics',
        'football', 'cricket', 'badminton'
      ],
      response: `<strong>Vibrant Co-Curricular &amp; Sports Activities</strong><br><br>
St. George's fosters holistic leadership through 9 dynamic co-curricular activities:<br><br>
&bull; <strong>CISCE National &amp; Regional Tournaments</strong> across track &amp; field, football, and indoor sports.<br>
&bull; <strong>Annual Days &amp; Cultural Extravaganzas.</strong><br>
&bull; <strong>Inter-House Competitions:</strong> Debates, elocution, quiz, music, and athletics.<br>
&bull; <strong>Science &amp; Art Exhibitions:</strong> Showcasing innovative student projects.<br>
&bull; <strong>Motivational Talks &amp; University Fairs:</strong> Career counseling for higher education.<br>
&bull; <strong>Health Talks &amp; Regular Medical Check-ups.</strong><br>
&bull; <strong>Specialized Training Sessions</strong> for both staff and students.`,
      actions: [
        { label: 'View Activities & Sports', url: 'index.html#activities', icon: 'bi-trophy', primary: true },
        { label: 'School Events Calendar', url: 'events.html', icon: 'bi-calendar-event', primary: false },
        { label: 'Photo Gallery', url: 'gallery.html', icon: 'bi-images', primary: false }
      ],
      quickReplies: ['Tournaments', 'House activities', 'Laurels & Toppers', 'Annual day']
    },

    {
      id: 'staff_activities',
      title: 'Staff Activities & Faculty Training',
      keywords: [
        'staff', 'staff activity', 'staff activities', 'teacher training', 'faculty', 'faculty development',
        'capacity building', 'teachers workshop', 'teacher workshop', 'workshop', 'workshops',
        'pedagogy', 'training session', 'training sessions', 'specialized training', 'educator training',
        'staff choir', 'christmas carol', 'staff christmas', 'teacher choir', 'teachers choir', 'carol service'
      ],
      response: `<strong>Staff Activities, Training Workshops &amp; Carol Choir</strong><br><br>
St. George's School Unit-II conducts regular specialized training sessions and celebrates rich faculty traditions:<br><br>
&bull; <strong>Pedagogical Innovation:</strong> Intensive training on modern CISCE curriculum frameworks, inquiry-driven learning, and student-centric assessments.<br>
&bull; <strong>Collaborative Roundtables:</strong> Teachers working together across departments to design experiential lesson plans and creative teaching aids.<br>
&bull; <strong>Expert Facilitation:</strong> Guest resource speakers delivering seminars on emotional intelligence and 21st-century educational technology.<br>
&bull; <strong>Annual Staff Christmas Carol Choir:</strong> Iconic institutional tradition where the complete teaching fraternity unifies on the stage for celebratory choral hymns under the Diocese of Agra.`,
      actions: [
        { label: 'View Staff Activities Gallery', url: 'gallery.html#staff-activities', icon: 'bi-images', primary: true },
        { label: 'Faculty Development Page', url: 'trainers.html', icon: 'bi-person-workspace', primary: false },
        { label: 'School Activities & Training', url: 'index.html#activities', icon: 'bi-people', primary: false }
      ],
      quickReplies: ['Staff Christmas Choir', 'Faculty Development', 'Photo Gallery', 'Campus Facilities']
    },

    {
      id: 'guidelines_student',
      title: 'Student Rules & Guidelines',
      keywords: [
        'rule', 'rules', 'guideline', 'guidelines', 'student guideline', 'discipline',
        'behavior', 'conduct', 'code of conduct', 'outsiders', 'english speaking',
        'homework', 'half day', 'leave', 'permission', 'punctuality', 'late', 'latecomer',
        'damage', 'fine', 'suspension', 'bicycle only', 'bike', 'scooter', 'outside food',
        'stranger', 'press onwards'
      ],
      response: `<strong>Code of Conduct &amp; Student Guidelines</strong><br><br>
Every Georgian is expected to uphold the pride of the school motto <em>&ldquo;Press Onwards&rdquo;</em>:<br><br>
1. Abide strictly by school rules and participate actively in all school activities.<br>
2. No outsiders/friends/relatives allowed inside campus without prior authorization.<br>
3. <strong>Speak only English</strong> during school hours (except in Hindi &amp; Sanskrit class).<br>
4. Be polite to peers and deeply respectful to teachers and staff.<br>
5. Complete homework, assignments, and holiday projects on time.<br>
6. Maintain cleanliness; damages to school property will attract fines and disciplinary action.<br>
7. Be punctual. No student may leave campus without written permission from Principal/Coordinator.<br>
8. <strong>No half-day is permissible</strong> in school under any normal circumstances.<br>
9. Arrive in neat uniform, short haircut, and polished shoes.<br>
10. <strong>Vehicle Rule:</strong> Only bicycles are allowed to be parked in school premises. Students are strictly not permitted to commute by motorcycle or scooter under any circumstances.<br>
11. Do not buy or eat food from outside vendors at the school gate.<br>
12. Never mix with strangers; immediately report any safety concerns to your class teacher.`,
      actions: [
        { label: 'Read Complete Guidelines', url: 'index.html#guidelines', icon: 'bi-shield-check', primary: true },
        { label: 'Uniform & Grooming Code', url: 'index.html#guidelines', icon: 'bi-person-check', primary: false }
      ],
      quickReplies: ['Uniform rules', 'Parents guidelines', 'PTM & Diaries', 'Bicycle rule']
    },

    {
      id: 'guidelines_parents',
      title: 'Parents Guidelines & PTM',
      keywords: [
        'parent', 'parents', 'guardian', 'guardians', 'parents guideline', 'ptm',
        'parent teacher meeting', 'diary', 'anecdotal', 'signature', 'remarks',
        'teacher remarks', 'jewellery', 'gold', 'mobile phone', 'phone', 'money',
        'watch', 'matchbox', 'lighter', 'knife', 'knives', 'medicine', 'medicines',
        'prohibited items', 'pickup', 'drop', 'transport', 'driver', 'van', 'auto',
        'tiffin', 'lunch', 'nutrition', 'healthy food'
      ],
      response: `<strong>Guidelines for Parents &amp; Guardians</strong><br><br>
Parents are our vital partners in fostering high standards of character and achievement:<br><br>
&bull; <strong>Punctuality &amp; Dress:</strong> Ensure your ward arrives regularly, punctually, and smartly dressed.<br>
&bull; <strong>Diary &amp; Anecdotal Records:</strong> Regularly check teachers' remarks in the school diary and sign them at PTMs.<br>
&bull; <strong>Prohibited Items:</strong> Students must NOT wear jewellery, gold rings, bangles, or carry mobile phones, expensive watches, or excess money.<br>
&bull; <strong>Safety Restrictions:</strong> Matches, lighters, steel rulers, knives, chemicals, or unprescribed medicines are strictly banned.<br>
&bull; <strong>Pickup Timing:</strong> Fetch your children within 15 minutes after school dismissal.<br>
&bull; <strong>Transport Authentication:</strong> Details of private van, auto, or driver must be duly authenticated and signed by parents.<br>
&bull; <strong>Healthy Tiffin:</strong> Pack only nutritious, hygienic food and water in student tiffin boxes.`,
      actions: [
        { label: 'Read Parents Guidelines & PTM', url: 'index.html#guidelines', icon: 'bi-people', primary: true },
        { label: 'Contact School Office', url: 'contact.html', icon: 'bi-envelope', primary: false }
      ],
      quickReplies: ['PTM details', 'Prohibited items', 'Student guidelines', 'School uniform']
    },

    {
      id: 'uniform',
      title: 'School Uniform & Grooming Code',
      keywords: [
        'uniform', 'dress', 'unifrom', 'cloth', 'clothes', 'summer uniform', 'winter uniform',
        'blazer', 'sweater', 'tie', 'belt', 'shoes', 'socks', 'hair', 'haircut', 'short hair',
        'ribbon', 'red ribbon', 'mehndi', 'mehendi', 'nail polish', 'hair colour'
      ],
      response: `<strong>Uniform &amp; Grooming Regulations</strong><br><br>
Students must arrive at school in clean, well-ironed uniforms and polished black shoes:<br><br>
&bull; <strong>Boys Grooming:</strong> Must maintain a neat, short gentleman haircut (except Sikh boys wearing proper patka/turban).<br>
&bull; <strong>Girls Grooming:</strong> Hair must be neatly tied up with regulation <strong>red ribbons</strong>.<br>
&bull; <strong>Strictly Prohibited:</strong> Hair color, tinting, mehndi, tattoo markings, and nail polish are strictly not allowed while attending school.<br>
&bull; Prescribed summer uniform and winter blazer/sweater must be worn as per the seasonal notification.`,
      actions: [
        { label: 'View Uniform Guidelines', url: 'index.html#guidelines', icon: 'bi-person-badge', primary: true },
        { label: 'Student Code of Conduct', url: 'index.html#guidelines', icon: 'bi-journal-check', primary: false }
      ],
      quickReplies: ['Student guidelines', 'Parents guidelines', 'Admissions']
    },

    {
      id: 'about_history',
      title: 'School History & Legacy',
      keywords: [
        'about', 'history', 'legacy', 'cantonment college', '1875', '2003', 'edward ralph johnson',
        'bishop of calcutta', 'chaplain', 'st george church', 'diocese of agra', 'cni',
        'church of north india', 'sr cutting', 'cutting', 'jeremiah', 'founder', 'founded',
        'ashish paul habil', 'habil', 'bagh muzaffar khan', 'aegis', 'diocese education board',
        'pride of agra', 'up386'
      ],
      response: `<strong>Distinguished History &amp; Heritage (Est. 1875 &bull; Unit-II Founded 2003)</strong><br><br>
&bull; <strong>1875 Origin:</strong> St. George's College, Agra Cantt. was established as Cantonment College by the Most Revd. Edward Ralph Johnson, with the Bishop of Calcutta as First Chairman and the Chaplain of St. George's Church as First Secretary and Principal.<br>
&bull; <strong>Founding of Unit-II:</strong> To serve the growing educational demand, St. George's School Unit-II was founded on <strong>22nd April 2003</strong> at Bagh Muzaffar Khan, blessed by the Chairman the Rt. Revd. S.R. Cutting (Bishop of Agra) and Founder Principal Mr. J.S. Jeremiah.<br>
&bull; <strong>Present Leadership:</strong> Led today by the visionary Principal <strong>Mr. Ashish Paul Habil</strong> under the aegis of the Diocese of Agra, Church of North India (CNI), Diocese Education Board (4/116-B, Church Road, Civil Lines, Agra).<br>
&bull; <strong>Affiliation:</strong> CISCE, New Delhi (School Code: <strong>UP386</strong>).`,
      actions: [
        { label: 'Read History & Heritage', url: 'about.html#history', icon: 'bi-hourglass-split', primary: true },
        { label: 'About School Overview', url: 'about.html', icon: 'bi-info-circle', primary: false },
        { label: 'Vision & Strategic Pillars', url: 'index.html#about', icon: 'bi-eye', primary: false }
      ],
      quickReplies: ['Vision & Pillars', 'Principal message', 'Curriculum CISCE', 'Facilities']
    },

    {
      id: 'vision_pillars',
      title: 'Vision & 4 Strategic Pillars',
      keywords: [
        'vision', 'mission', 'aim', 'aims', 'philosophy', 'pillar', 'pillars',
        '4 pillars', 'strategic pillars', 'holistic', 'values', 'pedagogy',
        'inspiration over dictation', 'understanding over condemnation',
        'teamwork', 'harmony', 'excellence', 'total education', 'selflessness', 'service'
      ],
      response: `<strong>Vision &amp; 4 Strategic Pillars</strong><br><br>
St. George's School Unit-II is dedicated to holistic, value-based education grounded in sincerity, dedication, and self-confidence, inspiring an other-centred mindset of empathy and service.<br><br>
<strong>The Four Foundational Pillars:</strong><br>
1. <strong>Holistic &amp; Value-Based Education:</strong> Total education across academic, emotional, social, and physical dimensions with integrity and service.<br>
2. <strong>Inspirational &amp; Compassionate Pedagogy:</strong> Inspiration over dictation, mentorship, understanding over condemnation, and an inclusive safe space for all learners.<br>
3. <strong>Collaborative &amp; Professional Culture:</strong> Teamwork, mutual acceptance, leading by personal example, courtesy, and continuous openness to growth.<br>
4. <strong>Harmonious Environment &amp; Pursuit of Excellence:</strong> Campus as a sanctuary of safety, peace, cooperation, and collective elevation.`,
      actions: [
        { label: 'Explore Vision & 4 Pillars', url: 'about.html#vision', icon: 'bi-columns-gap', primary: true },
        { label: 'Principal\'s Message', url: 'index.html#principal', icon: 'bi-person-badge', primary: false }
      ],
      quickReplies: ['History of school', 'Principal message', 'CISCE curriculum']
    },

    {
      id: 'principal',
      title: 'Principal\'s Message',
      keywords: [
        'principal', 'principals message', 'principal message', 'headmaster',
        'ashish paul habil', 'mr ashish paul habil', 'mr habil', 'leadership', 'director'
      ],
      response: `<strong>Principal's Message &bull; Mr. Ashish Paul Habil</strong><br><br>
Led by Principal Mr. Ashish Paul Habil, St. George's School Unit-II cultivates an inspiring academic climate where intellectual curiosity is paired with ethical character and community service.<br><br>
<em>&ldquo;Guided by our core motto 'Press Onwards', we foster balanced development, mutual respect, and academic distinction for every student under our care.&rdquo;</em>`,
      actions: [
        { label: 'Read Principal\'s Full Message', url: 'index.html#principal', icon: 'bi-chat-square-quote', primary: true },
        { label: 'Vision & Strategic Pillars', url: 'index.html#about', icon: 'bi-eye', primary: false }
      ],
      quickReplies: ['History', 'Admissions', 'Laurels & Toppers', 'Guidelines']
    },

    {
      id: 'student_council',
      title: 'Student Council & Prefectorial Board',
      keywords: [
        'student council', 'council', 'prefect', 'prefects', 'prefectorial', 'prefectorial board',
        'head boy', 'head girl', 'house captain', 'vice captain', 'student leadership',
        'investiture', 'investiture ceremony', 'badging', 'oath', 'student leader'
      ],
      response: `<strong>Student Council &amp; Prefectorial Leadership Body</strong><br><br>
St. George's School Unit-II instills visionary leadership, integrity, and peer guidance through our official <strong>Student Council</strong>:<br><br>
&bull; <strong>Commissioned Leadership:</strong> Head Boy, Head Girl, House Captains, Vice Captains, and Prefects inducted by Principal Mr. Ashish Paul Habil on the historic campus portico.<br>
&bull; <strong>Ethos &amp; Duty:</strong> Upholding school discipline, organizing co-curricular activities, maintaining student welfare, and championing the motto <em>&ldquo;Press Onwards&rdquo;</em>.<br>
&bull; <strong>Awards &amp; Laurels:</strong> Council leaders compete for prestigious honors including <strong>Mr. George</strong>, <strong>Ms. George</strong>, and academic distinction trophies.`,
      actions: [
        { label: 'View Student Council Gallery', url: 'gallery.html#student-council-awards', icon: 'bi-images', primary: true },
        { label: 'School Laurels & Awards', url: 'index.html#laurels', icon: 'bi-award-fill', primary: false },
        { label: 'High School Leadership Wing', url: 'HighSchool.html', icon: 'bi-mortarboard-fill', primary: false }
      ],
      quickReplies: ['Mr. George & Ms. George', 'School Laurels', 'High School Wing', 'Photo Gallery']
    },

    {
      id: 'laurels',
      title: 'Laurels, Awards & Georgians of the School',
      keywords: [
        'laurel', 'laurels', 'topper', 'toppers', 'rank', 'first ranked', 'result',
        'results', 'achievement', 'achievements', 'georgians', 'georgians of the school',
        'champion house', 'trophy', 'trophies', 'best student', 'awards', 'merit',
        'mr george', 'ms george', 'miss george', 'mister george', 'runner up', 'annual award'
      ],
      response: `<strong>School Laurels, Trophies &amp; Georgians of the School</strong><br><br>
St. George's School Unit-II proudly celebrates the stellar triumphs of our students:<br><br>
&bull; <strong>First Ranked Students:</strong> Academic distinction winners and board examination toppers awarded prestigious golden trophies alongside Principal Mr. Ashish Paul Habil.<br>
&bull; <strong>Georgians of the School:</strong> Pinnacle accolade awarded to <strong>Mr. George</strong> and <strong>Ms. George</strong> along with Runners-Up for all-round excellence across academics, leadership, sports, and culture.<br>
&bull; <strong>Champion House Trophy:</strong> Prestigious Cock House Trophy presented to the leading house for supreme inter-house competitive points.`,
      actions: [
        { label: 'View Student Council & Awards Gallery', url: 'gallery.html#student-council-awards', icon: 'bi-trophy-fill', primary: true },
        { label: 'School Laurels & Toppers', url: 'index.html#laurels', icon: 'bi-award', primary: false },
        { label: 'House Activities & Tournaments', url: 'index.html#activities', icon: 'bi-flag', primary: false }
      ],
      quickReplies: ['Student council', 'Mr. George & Ms. George', 'High School Wing', 'Activities']
    },

    {
      id: 'alumni',
      title: 'Alumni Network',
      keywords: [
        'alumni', 'alumnus', 'old students', 'pass out', 'graduates', 'ex-students',
        'alumni network', 'alumni association', 'alumni message'
      ],
      response: `<strong>St. George's Alumni Network</strong><br><br>
Our alumni carry the cherished spirit of <em>&ldquo;Press Onwards&rdquo;</em> into esteemed careers in medicine, civil services, technology, law, business, and national service across India and abroad.<br><br>
We invite all past Georgians to stay connected, mentor junior batches, and participate in alumni reunions.`,
      actions: [
        { label: 'Explore Alumni Network', url: 'index.html#alumni', icon: 'bi-people-fill', primary: true },
        { label: 'Contact School Office', url: 'contact.html', icon: 'bi-envelope', primary: false }
      ],
      quickReplies: ['History', 'Laurels', 'Principal message']
    },

    {
      id: 'contact_location',
      title: 'Contact, Location & Office Hours',
      keywords: [
        'contact', 'contact us', 'phone', 'telephone', 'mobile', 'call', 'email',
        'address', 'location', 'where is', 'map', 'directions', 'reach', 'timing',
        'timings', 'office hour', 'office hours', 'school timing', 'visiting hour',
        'visiting hours', 'reception', 'helpdesk', 'bagh muzaffar khan', 'agra'
      ],
      response: `<strong>Contact &amp; Campus Location</strong><br><br>
<strong>St. George's School Unit-II</strong><br>
Bagh Muzaffar Khan, Agra, Uttar Pradesh, India.<br>
Affiliated to CISCE, New Delhi (School Code: <strong>UP386</strong>)<br>
Aegis: Diocese Education Board, 4/116-B, Church Road, Civil Lines, Agra.<br><br>
&bull; <strong>Office Visiting Hours:</strong> 8:30 AM &ndash; 1:30 PM (School Working Days)<br>
&bull; <strong>Inquiries:</strong> Admissions, documents verification &amp; fee queries.`,
      actions: [
        { label: 'View Contact Page & Campus Map', url: 'contact.html', icon: 'bi-geo-alt-fill', primary: true },
        { label: 'Nur-KG Admission Link', url: 'contact.html', icon: 'bi-pencil-square', primary: false }
      ],
      quickReplies: ['Admission procedure', 'Fee rules', 'School guidelines', 'Campus facilities']
    },

    {
      id: 'calendar_events',
      title: 'School Calendar & Events',
      keywords: [
        'calendar', 'planner', 'yearly planner', 'event', 'events', 'holiday',
        'holidays', 'vacation', 'summer vacation', 'winter break', 'exam date',
        'exam schedule', 'schedule', 'annual event', 'functions'
      ],
      response: `<strong>School Calendar &amp; Yearly Planner</strong><br><br>
The comprehensive academic planner outlines all term assessments, CISCE examinations, gazetted holidays, inter-house activity weeks, and annual celebrations.<br><br>
Please consult our events section and the student anecdotal diary for real-time announcements.`,
      actions: [
        { label: 'View School Calendar & Events', url: 'events.html', icon: 'bi-calendar3', primary: true },
        { label: 'Co-Curricular Activities', url: 'index.html#activities', icon: 'bi-trophy', primary: false }
      ],
      quickReplies: ['CISCE curriculum', 'Activities', 'Admissions']
    }
  ];

  /* ==============================================================
     # 2. Fuzzy NLP Matching & Intent Scoring Engine
     ============================================================== */

  // Levenshtein distance for spelling error tolerance
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Tokenize string into lowercase clean words
  function tokenize(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1);
  }

  // Score query against an intent
  function scoreIntent(query, intent) {
    const qLower = query.toLowerCase().trim();
    const qTokens = tokenize(query);
    let score = 0;

    // Direct substring or exact phrase match
    for (const kw of intent.keywords) {
      if (qLower.includes(kw)) {
        // Multi-word exact phrase match gets heavy bonus
        const wordCount = kw.split(' ').length;
        score += wordCount >= 2 ? 18 : 10;
      }
    }

    // Token-level matching with fuzzy typo tolerance
    for (const qTok of qTokens) {
      // Skip very generic stop words
      if (['the', 'and', 'for', 'are', 'what', 'where', 'when', 'how', 'who', 'why', 'can', 'you', 'tell', 'show', 'please', 'give', 'want', 'about', 'some', 'this', 'that', 'with'].includes(qTok)) {
        continue;
      }

      for (const kw of intent.keywords) {
        const kwTokens = kw.split(' ');
        for (const kTok of kwTokens) {
          if (qTok === kTok) {
            score += 8;
          } else if (qTok.length >= 4 && kTok.length >= 4) {
            const dist = levenshtein(qTok, kTok);
            // Allow 1 typo for words of length 4-6, 2 typos for longer words
            if ((kTok.length <= 6 && dist <= 1) || (kTok.length > 6 && dist <= 2)) {
              score += 6;
            }
          }
        }
      }
    }

    return score;
  }

  // Find best matching intent from query
  function findBestIntent(query, lastIntentId) {
    let bestMatch = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      const score = scoreIntent(query, item);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // Contextual follow-up check: if user asks short follow up like "where is it?", "fees?", "how to apply?"
    if (highestScore < 8 && lastIntentId) {
      const qLower = query.toLowerCase();
      if (['where', 'how', 'when', 'more', 'details', 'tell me more', 'fees', 'cost', 'apply'].some(w => qLower.includes(w))) {
        const prev = KNOWLEDGE_BASE.find(k => k.id === lastIntentId);
        if (prev) {
          return { intent: prev, score: 7, isFollowUp: true };
        }
      }
    }

    return { intent: bestMatch, score: highestScore, isFollowUp: false };
  }

  // Fallback response generator
  function getFallbackResponse(query) {
    return {
      title: 'Help Desk Assistance',
      response: `I want to ensure you get accurate information about <strong>St. George's School Unit-II</strong>. I didn't quite catch your query regarding <em>"${escapeHtml(query)}"</em>.<br><br>
You can explore the most popular sections below or reach out directly to the school administrative desk.`,
      actions: [
        { label: 'Nur-KG Admission Link (Temporary)', url: 'contact.html', icon: 'bi-pencil-square', primary: true },
        { label: 'CISCE Curriculum & Streams', url: 'courses.html', icon: 'bi-journal-check', primary: false },
        { label: 'School Guidelines & Rules', url: 'index.html#guidelines', icon: 'bi-shield-check', primary: false },
        { label: 'Contact School Office & Location', url: 'contact.html', icon: 'bi-geo-alt', primary: false }
      ],
      quickReplies: ['Admissions', 'Fee structure', 'Facilities', 'Guidelines', 'History']
    };
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatCurrentTime() {
    const d = new Date();
    let hours = d.getHours();
    let mins = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? '0' + mins : mins;
    return `${hours}:${mins} ${ampm}`;
  }

  /* ==============================================================
     # 3. Chatbot UI Component Injection & State Management
     ============================================================== */
  let lastActiveIntentId = null;
  let isWindowOpen = false;
  let isWindowMinimized = false;

  const DEFAULT_QUICK_REPLIES = [
    'Admissions',
    'Curriculum & Streams',
    'Campus Facilities',
    'School Guidelines',
    'Contact & Location'
  ];

  function buildChatbotDOM() {
    // Only inject if not already present
    if (document.getElementById('stg-chatbot-launcher')) return;

    // 1. Launcher button
    const launcher = document.createElement('button');
    launcher.id = 'stg-chatbot-launcher';
    launcher.setAttribute('aria-label', 'Open AI Website Navigation Assistant');
    launcher.setAttribute('title', 'Chat with St. George\'s AI Assistant');
    launcher.innerHTML = `
      <i class="bi bi-chat-dots-fill launcher-icon"></i>
      <span class="chatbot-badge-pulse"></span>
      <span class="chatbot-launcher-tooltip">Ask St. George\'s AI</span>
    `;

    // 2. Chat window container
    const chatWindow = document.createElement('div');
    chatWindow.id = 'stg-chatbot-window';
    chatWindow.setAttribute('role', 'dialog');
    chatWindow.setAttribute('aria-label', 'St. George\'s School Assistant');
    chatWindow.innerHTML = `
      <!-- Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-brand">
          <div class="chatbot-header-avatar">
            <img src="assets/img/st_georges_logo.png" alt="St. George's Crest">
          </div>
          <div class="chatbot-header-info">
            <h4 class="chatbot-header-title">Georgian Assistant</h4>
            <span class="chatbot-header-status">
              <span class="status-dot"></span> Online &bull; CISCE UP386
            </span>
          </div>
        </div>
        <div class="chatbot-header-controls">
          <button id="chatbot-btn-clear" class="chat-ctrl-btn" title="Restart / Clear Conversation" aria-label="Clear chat">
            <i class="bi bi-arrow-counterclockwise"></i>
          </button>
          <button id="chatbot-btn-minimize" class="chat-ctrl-btn" title="Minimize Chat" aria-label="Minimize chat">
            <i class="bi bi-dash-lg"></i>
          </button>
          <button id="chatbot-btn-close" class="chat-ctrl-btn" title="Close Chat" aria-label="Close chat">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <!-- Messages Body -->
      <div id="chatbot-messages-body" class="chatbot-body">
        <!-- Welcome Message -->
        <div class="chat-msg bot">
          <div class="chat-avatar-mini">
            <img src="assets/img/st_georges_logo.png" alt="Crest">
          </div>
          <div class="chat-bubble">
            <strong>Welcome to St. George's School Unit-II!</strong><br>
            I am your smart AI website navigation assistant. How can I help you today?
            <div class="chat-action-container">
              <a href="contact.html" class="chat-action-btn">
                <span><i class="bi bi-star-fill text-warning me-1"></i> Nur-KG Admission Link (Temporary)</span>
                <i class="bi bi-arrow-right-short"></i>
              </a>
              <a href="index.html#about" class="chat-action-btn secondary">
                <span><i class="bi bi-hourglass-split me-1"></i> School History &amp; 4 Pillars</span>
                <i class="bi bi-arrow-right-short"></i>
              </a>
              <a href="courses.html" class="chat-action-btn secondary">
                <span><i class="bi bi-journal-text me-1"></i> CISCE Curriculum &amp; Streams</span>
                <i class="bi bi-arrow-right-short"></i>
              </a>
            </div>
            <span class="chat-time">${formatCurrentTime()}</span>
          </div>
        </div>
      </div>

      <!-- Quick Reply Suggestions -->
      <div id="chatbot-quick-replies" class="chatbot-quick-replies">
        ${DEFAULT_QUICK_REPLIES.map(q => `<button type="button" class="quick-chip" data-query="${q}">${q}</button>`).join('')}
      </div>

      <!-- Footer Input -->
      <form id="chatbot-input-form" class="chatbot-footer" onsubmit="return false;">
        <input type="text" id="chatbot-input-field" class="chatbot-input" placeholder="Ask about admissions, fees, labs, rules..." autocomplete="off">
        <button type="submit" id="chatbot-send-btn" class="chatbot-send-btn" aria-label="Send message">
          <i class="bi bi-send-fill"></i>
        </button>
      </form>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(chatWindow);

    bindChatbotEvents();
    loadSessionHistory();
  }

  /* ==============================================================
     # 4. Event Handlers & User Interaction
     ============================================================== */
  function bindChatbotEvents() {
    const launcher = document.getElementById('stg-chatbot-launcher');
    const chatWindow = document.getElementById('stg-chatbot-window');
    const closeBtn = document.getElementById('chatbot-btn-close');
    const minimizeBtn = document.getElementById('chatbot-btn-minimize');
    const clearBtn = document.getElementById('chatbot-btn-clear');
    const form = document.getElementById('chatbot-input-form');
    const input = document.getElementById('chatbot-input-field');
    const quickRepliesContainer = document.getElementById('chatbot-quick-replies');

    // Launcher click toggles chat
    launcher.addEventListener('click', () => {
      toggleChatWindow();
    });

    // Close button
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeChatWindow();
    });

    // Minimize button
    minimizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMinimize();
    });

    // Clear conversation
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearChatConversation();
    });

    // Form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit();
    });

    // Quick reply chips delegation
    quickRepliesContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.quick-chip');
      if (chip) {
        const query = chip.getAttribute('data-query');
        if (query) {
          processUserQuery(query);
        }
      }
    });

    // ESC key closes chat
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isWindowOpen) {
        closeChatWindow();
      }
    });
  }

  function toggleChatWindow() {
    const chatWindow = document.getElementById('stg-chatbot-window');
    if (!isWindowOpen) {
      chatWindow.classList.add('active');
      chatWindow.classList.remove('minimized');
      isWindowOpen = true;
      isWindowMinimized = false;
      setTimeout(() => {
        const input = document.getElementById('chatbot-input-field');
        if (input) input.focus();
      }, 300);
    } else {
      closeChatWindow();
    }
  }

  function closeChatWindow() {
    const chatWindow = document.getElementById('stg-chatbot-window');
    chatWindow.classList.remove('active');
    isWindowOpen = false;
  }

  function toggleMinimize() {
    const chatWindow = document.getElementById('stg-chatbot-window');
    isWindowMinimized = !isWindowMinimized;
    if (isWindowMinimized) {
      chatWindow.classList.add('minimized');
    } else {
      chatWindow.classList.remove('minimized');
    }
  }

  function clearChatConversation() {
    const body = document.getElementById('chatbot-messages-body');
    lastActiveIntentId = null;
    try {
      sessionStorage.removeItem('stg_chat_history');
    } catch (e) {}

    body.innerHTML = `
      <div class="chat-msg bot">
        <div class="chat-avatar-mini">
          <img src="assets/img/st_georges_logo.png" alt="Crest">
        </div>
        <div class="chat-bubble">
          <strong>Conversation cleared.</strong><br>
          Hello! How can I assist you with St. George's School Unit-II today?
          <div class="chat-action-container">
            <a href="contact.html" class="chat-action-btn">
              <span><i class="bi bi-star-fill text-warning me-1"></i> Nur-KG Admission Link (Temporary)</span>
              <i class="bi bi-arrow-right-short"></i>
            </a>
            <a href="index.html#facilities" class="chat-action-btn secondary">
              <span><i class="bi bi-building me-1"></i> Campus Facilities</span>
              <i class="bi bi-arrow-right-short"></i>
            </a>
          </div>
          <span class="chat-time">${formatCurrentTime()}</span>
        </div>
      </div>
    `;
    updateQuickReplies(DEFAULT_QUICK_REPLIES);
  }

  function handleUserSubmit() {
    const input = document.getElementById('chatbot-input-field');
    const query = input.value.trim();
    if (!query) return;
    input.value = '';
    processUserQuery(query);
  }

  function appendUserMessage(text) {
    const body = document.getElementById('chatbot-messages-body');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user';
    msgDiv.innerHTML = `
      <div class="chat-bubble">
        ${escapeHtml(text)}
        <span class="chat-time">${formatCurrentTime()}</span>
      </div>
    `;
    body.appendChild(msgDiv);
    scrollBodyToBottom();
    saveSessionMessage({ role: 'user', content: text, time: formatCurrentTime() });
  }

  function showTypingIndicator() {
    const body = document.getElementById('chatbot-messages-body');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'chatbot-typing-indicator';
    typingDiv.className = 'chat-msg bot';
    typingDiv.innerHTML = `
      <div class="chat-avatar-mini">
        <img src="assets/img/st_georges_logo.png" alt="Crest">
      </div>
      <div class="typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    body.appendChild(typingDiv);
    scrollBodyToBottom();
  }

  function removeTypingIndicator() {
    const ind = document.getElementById('chatbot-typing-indicator');
    if (ind) ind.remove();
  }

  function appendBotMessage(data) {
    const body = document.getElementById('chatbot-messages-body');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot';

    let actionsHtml = '';
    if (data.actions && data.actions.length > 0) {
      actionsHtml = `
        <div class="chat-action-container">
          ${data.actions.map(act => `
            <a href="${act.url}" class="chat-action-btn ${act.primary ? '' : 'secondary'}">
              <span><i class="bi ${act.icon || 'bi-arrow-right-circle'} me-1"></i> ${act.label}</span>
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
          `).join('')}
        </div>
      `;
    }

    msgDiv.innerHTML = `
      <div class="chat-avatar-mini">
        <img src="assets/img/st_georges_logo.png" alt="Crest">
      </div>
      <div class="chat-bubble">
        ${data.response}
        ${actionsHtml}
        <span class="chat-time">${formatCurrentTime()}</span>
      </div>
    `;
    body.appendChild(msgDiv);
    scrollBodyToBottom();
    saveSessionMessage({
      role: 'bot',
      content: data.response,
      actions: data.actions,
      time: formatCurrentTime()
    });
  }

  function updateQuickReplies(repliesList) {
    const container = document.getElementById('chatbot-quick-replies');
    if (!container) return;
    const items = (repliesList && repliesList.length > 0) ? repliesList : DEFAULT_QUICK_REPLIES;
    container.innerHTML = items.map(q => `<button type="button" class="quick-chip" data-query="${q}">${q}</button>`).join('');
  }

  function scrollBodyToBottom() {
    const body = document.getElementById('chatbot-messages-body');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }

  function processUserQuery(query) {
    appendUserMessage(query);
    showTypingIndicator();

    // Natural bot delay (350ms - 600ms) for conversational UX
    setTimeout(() => {
      removeTypingIndicator();
      const match = findBestIntent(query, lastActiveIntentId);

      if (match.intent && match.score >= 5) {
        lastActiveIntentId = match.intent.id;
        appendBotMessage({
          response: match.intent.response,
          actions: match.intent.actions
        });
        updateQuickReplies(match.intent.quickReplies);
      } else {
        const fallback = getFallbackResponse(query);
        appendBotMessage({
          response: fallback.response,
          actions: fallback.actions
        });
        updateQuickReplies(fallback.quickReplies);
      }
    }, 450);
  }

  /* ==============================================================
     # 5. Session Storage Persistence
     ============================================================== */
  function saveSessionMessage(msgObj) {
    try {
      const history = JSON.parse(sessionStorage.getItem('stg_chat_history') || '[]');
      history.push(msgObj);
      // Keep only last 20 messages to keep storage light
      if (history.length > 20) history.shift();
      sessionStorage.setItem('stg_chat_history', JSON.stringify(history));
    } catch (e) {}
  }

  function loadSessionHistory() {
    try {
      const history = JSON.parse(sessionStorage.getItem('stg_chat_history') || '[]');
      if (history.length > 0) {
        const body = document.getElementById('chatbot-messages-body');
        // Clear default welcome to render saved history
        body.innerHTML = '';
        history.forEach(item => {
          if (item.role === 'user') {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-msg user';
            msgDiv.innerHTML = `
              <div class="chat-bubble">
                ${escapeHtml(item.content)}
                <span class="chat-time">${item.time || ''}</span>
              </div>
            `;
            body.appendChild(msgDiv);
          } else if (item.role === 'bot') {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-msg bot';
            let actionsHtml = '';
            if (item.actions && item.actions.length > 0) {
              actionsHtml = `
                <div class="chat-action-container">
                  ${item.actions.map(act => `
                    <a href="${act.url}" class="chat-action-btn ${act.primary ? '' : 'secondary'}">
                      <span><i class="bi ${act.icon || 'bi-arrow-right-circle'} me-1"></i> ${act.label}</span>
                      <i class="bi bi-box-arrow-up-right"></i>
                    </a>
                  `).join('')}
                </div>
              `;
            }
            msgDiv.innerHTML = `
              <div class="chat-avatar-mini">
                <img src="assets/img/st_georges_logo.png" alt="Crest">
              </div>
              <div class="chat-bubble">
                ${item.content}
                ${actionsHtml}
                <span class="chat-time">${item.time || ''}</span>
              </div>
            `;
            body.appendChild(msgDiv);
          }
        });
        scrollBodyToBottom();
      }
    } catch (e) {}
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildChatbotDOM);
  } else {
    buildChatbotDOM();
  }

})();

