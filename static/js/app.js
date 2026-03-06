// ============================================================
// SVPM Campus Navigator — app.js
// ============================================================

const OSRM   = 'https://router.project-osrm.org/route/v1/foot/';
const CENTER = [18.1385, 74.4985];

// ============================================================
// LANGUAGES  (English / Marathi / Hindi)
// ============================================================
const LANGS = {
  en: {
    appName:'SVPM\'S College Route Navigator', campus:'Malegaon Campus (Bk)',
    searchPh:'Search buildings, departments...', dropdownDefault:'— Quick Go to Location —',
    catAll:'All', catAcad:'Academic', catFood:'Food', catHostel:'Hostel', catSports:'Sports', catServices:'Services',
    labelFrom:'FROM', labelTo:'TO', orSearch:'or search',
    myLocation:'📍 My current location',
    dirTitle:'Walking Directions', findingRoute:'Finding walking route...',
    noRoute:'Could not find route.\nPlease enable location.',
    cancelRoute:'✕ Cancel Route', swipeUp:'↑ Swipe up for all steps',
    startWalk:'Start walking from your location', arrived:'You have arrived at',
    distance:'Distance', walkTime:'Walk Time', turns:'Turns',
    locFound:'📍 Location found!', locDenied:'Location access denied',
    gettingLoc:'📍 Getting your location...', chooseDest:'Please choose a destination first',
    showRoute:'🗺️ Show Route on Map', getDir:'🧭 Show Route on Map',
    toLabel:'To: ', navTitle:'🧭 Get Directions', navSub:'Walk from your location to any building',
    locations:'locations',
    statLocations:'Locations', statColleges:'Colleges', statHostels:'Hostels',
    quickContacts:'📞 Quick Contacts', emergency:'🚨 Emergency', allLocations:'🏢 All Locations',
    coeContact:'College of Engineering', pharmacyContact:'College of Pharmacy',
    mainOffice:'Main Office', mainGate:'Main Gate', security:'Security',
    call:'Call', police:'Police', ambulance:'Ambulance', fire:'Fire',
    appInfoTitle:'📱 SVPM Campus Navigator',
    appInfoText:'Free campus navigation powered by OpenStreetMap & OSRM. No API key, no payments, works on any device.',
    builtFor:'Built for SVPM Students',
    navMap:'Map', navDirectory:'Directory', navNavigate:'Navigate', navInfo:'Info',
    btnInfo:'📋 Info', btnGo:'🧭 Go', btnGetDir:'🧭 Get Walking Directions',
    departments:'Departments', facilities:'Facilities', buildingInfo:'Building Info',
    floors:'Floors', gpsCoords:'GPS Coordinates',
    calculating:'⏳ Calculating route...', routingErr:'Routing error',
    loaded:'locations loaded',
    dirCountLabel:'locations',
    showingAll:'Showing all locations',
  },
  mr: {
    appName:'एसव्हीपीएम कॅम्पस नेव्हिगेटर', campus:'मालेगाव कॅम्पस (बक)',
    searchPh:'इमारती, विभाग शोधा...', dropdownDefault:'— स्थान निवडा —',
    catAll:'सर्व', catAcad:'शैक्षणिक', catFood:'जेवण', catHostel:'वसतिगृह', catSports:'क्रीडा', catServices:'सेवा',
    labelFrom:'कोठून', labelTo:'कोठे', orSearch:'किंवा शोधा',
    myLocation:'📍 माझे सध्याचे स्थान',
    dirTitle:'पायी दिशा', findingRoute:'मार्ग शोधत आहे...',
    noRoute:'मार्ग सापडला नाही.\nलोकेशन सुरू करा.',
    cancelRoute:'✕ मार्ग रद्द करा', swipeUp:'↑ सर्व पायऱ्यांसाठी वर स्वाइप करा',
    startWalk:'तुमच्या स्थानावरून चालणे सुरू करा', arrived:'तुम्ही पोहोचलात',
    distance:'अंतर', walkTime:'चालण्याची वेळ', turns:'वळणे',
    locFound:'📍 स्थान मिळाले!', locDenied:'लोकेशन नाकारले',
    gettingLoc:'📍 स्थान मिळवत आहे...', chooseDest:'कृपया प्रथम गंतव्य निवडा',
    showRoute:'🗺️ नकाशावर मार्ग दाखवा', getDir:'🧭 नकाशावर मार्ग दाखवा',
    toLabel:'येथे: ', navTitle:'🧭 दिशा मिळवा', navSub:'तुमच्या स्थानापासून कोणत्याही इमारतीकडे चाला',
    locations:'ठिकाणे',
    statLocations:'ठिकाणे', statColleges:'महाविद्यालये', statHostels:'वसतिगृहे',
    quickContacts:'📞 त्वरित संपर्क', emergency:'🚨 आणीबाणी', allLocations:'🏢 सर्व ठिकाणे',
    coeContact:'अभियांत्रिकी महाविद्यालय', pharmacyContact:'फार्मसी महाविद्यालय',
    mainOffice:'मुख्य कार्यालय', mainGate:'मुख्य दरवाजा', security:'सुरक्षा',
    call:'कॉल करा', police:'पोलीस', ambulance:'रुग्णवाहिका', fire:'अग्निशमन',
    appInfoTitle:'📱 एसव्हीपीएम कॅम्पस नेव्हिगेटर',
    appInfoText:'OpenStreetMap आणि OSRM द्वारे मोफत कॅम्पस नेव्हिगेशन. कोणतीही API की नाही, पेमेंट नाही.',
    builtFor:'एसव्हीपीएम विद्यार्थ्यांसाठी बनवले',
    navMap:'नकाशा', navDirectory:'यादी', navNavigate:'दिशा', navInfo:'माहिती',
    btnInfo:'📋 माहिती', btnGo:'🧭 जा', btnGetDir:'🧭 पायी दिशा मिळवा',
    departments:'विभाग', facilities:'सुविधा', buildingInfo:'इमारत माहिती',
    floors:'मजले', gpsCoords:'GPS निर्देशांक',
    calculating:'⏳ मार्ग मोजत आहे...', routingErr:'मार्ग त्रुटी',
    loaded:'ठिकाणे लोड झाली',
    dirCountLabel:'ठिकाणे',
    showingAll:'सर्व ठिकाणे दाखवत आहे',
  },
  hi: {
    appName:'एसवीपीएम कैंपस नेविगेटर', campus:'मालेगांव कैंपस (बक)',
    searchPh:'इमारतें, विभाग खोजें...', dropdownDefault:'— स्थान चुनें —',
    catAll:'सभी', catAcad:'शैक्षणिक', catFood:'भोजन', catHostel:'छात्रावास', catSports:'खेल', catServices:'सेवाएँ',
    labelFrom:'से', labelTo:'तक', orSearch:'या खोजें',
    myLocation:'📍 मेरा वर्तमान स्थान',
    dirTitle:'पैदल दिशाएँ', findingRoute:'रास्ता खोज रहे हैं...',
    noRoute:'रास्ता नहीं मिला।\nलोकेशन चालू करें।',
    cancelRoute:'✕ रास्ता रद्द करें', swipeUp:'↑ सभी चरणों के लिए ऊपर स्वाइप करें',
    startWalk:'अपने स्थान से चलना शुरू करें', arrived:'आप पहुँच गए',
    distance:'दूरी', walkTime:'चलने का समय', turns:'मोड़',
    locFound:'📍 स्थान मिला!', locDenied:'लोकेशन अस्वीकृत',
    gettingLoc:'📍 स्थान प्राप्त कर रहे हैं...', chooseDest:'कृपया पहले गंतव्य चुनें',
    showRoute:'🗺️ नक्शे पर रास्ता दिखाएँ', getDir:'🧭 नक्शे पर रास्ता दिखाएँ',
    toLabel:'तक: ', navTitle:'🧭 दिशाएँ पाएँ', navSub:'अपने स्थान से किसी भी इमारत तक चलें',
    locations:'स्थान',
    statLocations:'स्थान', statColleges:'कॉलेज', statHostels:'छात्रावास',
    quickContacts:'📞 त्वरित संपर्क', emergency:'🚨 आपातकाल', allLocations:'🏢 सभी स्थान',
    coeContact:'इंजीनियरिंग कॉलेज', pharmacyContact:'फार्मेसी कॉलेज',
    mainOffice:'मुख्य कार्यालय', mainGate:'मुख्य द्वार', security:'सुरक्षा',
    call:'कॉल करें', police:'पुलिस', ambulance:'एम्बुलेंस', fire:'अग्निशमन',
    appInfoTitle:'📱 एसवीपीएम कैंपस नेविगेटर',
    appInfoText:'OpenStreetMap और OSRM द्वारा मुफ्त कैंपस नेविगेशन। कोई API कुंजी नहीं, कोई भुगतान नहीं।',
    builtFor:'एसवीपीएम छात्रों के लिए बनाया गया',
    navMap:'नक्शा', navDirectory:'सूची', navNavigate:'दिशा', navInfo:'जानकारी',
    btnInfo:'📋 जानकारी', btnGo:'🧭 जाएँ', btnGetDir:'🧭 पैदल दिशाएँ पाएँ',
    departments:'विभाग', facilities:'सुविधाएँ', buildingInfo:'इमारत जानकारी',
    floors:'मंजिल', gpsCoords:'GPS निर्देशांक',
    calculating:'⏳ रास्ता गणना हो रही है...', routingErr:'रूटिंग त्रुटि',
    loaded:'स्थान लोड हुए',
    dirCountLabel:'स्थान',
    showingAll:'सभी स्थान दिखा रहे हैं',
  },
};
let currentLang = 'en';
function t(key) { return LANGS[currentLang][key] || LANGS.en[key] || key; }

// ============================================================
// TERM TRANSLATIONS — for dept/facility/description content
// from buildings.json that is stored in English
// ============================================================
const TERMS = {
  // ─── LONG PHRASES first (matched before shorter ones) ───────────────────────
  'Hostel Administration':       { mr:'वसतिगृह प्रशासन',         hi:'छात्रावास प्रशासन' },
  'Mess Administration':         { mr:'जेवणघर प्रशासन',          hi:'भोजनालय प्रशासन' },
  'Canteen Services':            { mr:'कँटीन सेवा',               hi:'कैंटीन सेवाएँ' },
  'Campus Services':             { mr:'कॅम्पस सेवा',              hi:'कैंपस सेवाएँ' },
  'Campus Grounds':              { mr:'कॅम्पस मैदान',             hi:'कैंपस मैदान' },
  'Sports Department':           { mr:'क्रीडा विभाग',             hi:'खेल विभाग' },
  'Cultural Committee':          { mr:'सांस्कृतिक समिती',         hi:'सांस्कृतिक समिति' },
  'Student Services':            { mr:'विद्यार्थी सेवा',          hi:'छात्र सेवाएँ' },
  'Workshop Department':         { mr:'कार्यशाळा विभाग',          hi:'कार्यशाला विभाग' },
  'Security Cabin':              { mr:'सुरक्षा केबिन',            hi:'सुरक्षा केबिन' },
  'Visitor Entry':               { mr:'अभ्यागत प्रवेश',           hi:'आगंतुक प्रवेश' },
  'Entry/Exit Control':          { mr:'प्रवेश/निर्गम नियंत्रण',   hi:'प्रवेश/निकास नियंत्रण' },
  'Mechanical Engineering':      { mr:'यांत्रिक अभियांत्रिकी',   hi:'मैकेनिकल इंजीनियरिंग' },
  'Civil Engineering':           { mr:'स्थापत्य अभियांत्रिकी',   hi:'सिविल इंजीनियरिंग' },
  'Electrical Engineering':      { mr:'विद्युत अभियांत्रिकी',    hi:'इलेक्ट्रिकल इंजीनियरिंग' },
  'Computer Engineering':        { mr:'संगणक अभियांत्रिकी',      hi:'कंप्यूटर इंजीनियरिंग' },
  'Pharmaceutical Chemistry':    { mr:'औषध रसायनशास्त्र',         hi:'फार्मास्युटिकल रसायन विज्ञान' },
  'Diploma Engineering':         { mr:'डिप्लोमा अभियांत्रिकी',   hi:'डिप्लोमा इंजीनियरिंग' },
  'Information Technology':      { mr:'माहिती तंत्रज्ञान',        hi:'सूचना प्रौद्योगिकी' },
  'Computer Science':            { mr:'संगणक शास्त्र',            hi:'कंप्यूटर विज्ञान' },
  'Drawing Hall':                { mr:'रेखाचित्र सभागृह',         hi:'ड्राइंग हॉल' },
  'Dining Hall':                 { mr:'भोजन सभागृह',              hi:'डाइनिंग हॉल' },
  'Seminar Hall':                { mr:'चर्चासत्र सभागृह',         hi:'सेमिनार हॉल' },
  'Prayer Hall':                 { mr:'प्रार्थना सभागृह',         hi:'प्रार्थना हॉल' },
  'Exam Hall':                   { mr:'परीक्षा सभागृह',           hi:'परीक्षा हॉल' },
  'Study Hall':                  { mr:'अभ्यास सभागृह',            hi:'अध्ययन कक्ष' },
  'Common Room':                 { mr:'सामाईक खोली',              hi:'सामान्य कक्ष' },
  'Staff Room':                  { mr:'शिक्षक कक्ष',              hi:'स्टाफ रूम' },
  'Reading Room':                { mr:'वाचन कक्ष',                hi:'पढ़ने का कमरा' },
  'Recreation Room':             { mr:'मनोरंजन कक्ष',             hi:'मनोरंजन कक्ष' },
  'Warden Office':               { mr:'वॉर्डन कार्यालय',          hi:'वार्डन कार्यालय' },
  'Main Office':                 { mr:'मुख्य कार्यालय',           hi:'मुख्य कार्यालय' },
  'Computer Labs':               { mr:'संगणक प्रयोगशाळा',         hi:'कंप्यूटर प्रयोगशाला' },
  'Science Labs':                { mr:'विज्ञान प्रयोगशाळा',       hi:'विज्ञान प्रयोगशाला' },
  'Basketball Court':            { mr:'बास्केटबॉल मैदान',         hi:'बास्केटबॉल कोर्ट' },
  'Cricket Ground':              { mr:'क्रिकेट मैदान',            hi:'क्रिकेट मैदान' },
  'Main Ground':                 { mr:'मुख्य मैदान',              hi:'मुख्य मैदान' },
  'Main Gate':                   { mr:'मुख्य दरवाजा',             hi:'मुख्य द्वार' },
  'Warden Cabin':                { mr:'वॉर्डन केबिन',             hi:'वार्डन केबिन' },
  'Seating Area':                { mr:'बैठण्याची जागा',           hi:'बैठने की जगह' },
  'Green Space':                 { mr:'हरित क्षेत्र',             hi:'हरित क्षेत्र' },
  'Walking Path':                { mr:'चालण्याचा मार्ग',          hi:'पैदल मार्ग' },
  'Open Ground':                 { mr:'मोकळे मैदान',              hi:'खुला मैदान' },
  'Event Space':                 { mr:'कार्यक्रम मैदान',          hi:'कार्यक्रम स्थल' },
  'Food Counter':                { mr:'जेवण काउंटर',              hi:'भोजन काउंटर' },
  'Audio System':                { mr:'ध्वनी प्रणाली',            hi:'ऑडियो सिस्टम' },
  'Lathe Machines':              { mr:'लेथ मशीन',                 hi:'लेथ मशीन' },
  'Welding Area':                { mr:'वेल्डिंग क्षेत्र',         hi:'वेल्डिंग क्षेत्र' },
  'Fitting Section':             { mr:'फिटिंग विभाग',             hi:'फिटिंग सेक्शन' },
  'Fabrication Section':         { mr:'निर्मिती विभाग',           hi:'फैब्रिकेशन सेक्शन' },
  'Research Center':             { mr:'संशोधन केंद्र',            hi:'अनुसंधान केंद्र' },
  'Xerox Center':                { mr:'झेरॉक्स केंद्र',           hi:'फोटोकॉपी केंद्र' },
  'Two-Wheeler Parking':         { mr:'दुचाकी पार्किंग',          hi:'दोपहिया पार्किंग' },
  'Four-Wheeler Parking':        { mr:'चारचाकी पार्किंग',         hi:'चौपहिया पार्किंग' },
  'Sports Ground':               { mr:'क्रीडा मैदान',             hi:'खेल का मैदान' },
  'Drinking Water':              { mr:'पिण्याचे पाणी',            hi:'पीने का पानी' },
  'Boys Hostel':                 { mr:'मुलांचे वसतिगृह',          hi:'लड़कों का छात्रावास' },
  'Girls Hostel':                { mr:'मुलींचे वसतिगृह',          hi:'लड़कियों का छात्रावास' },
  'Hostel Gate':                 { mr:'वसतिगृह दरवाजा',           hi:'छात्रावास द्वार' },
  'Wi-Fi':                       { mr:'वाय-फाय',                  hi:'वाई-फाई' },
  'D.Pharmacy':                  { mr:'डी.फार्मसी',               hi:'डी.फार्मेसी' },
  'B.Pharmacy':                  { mr:'बी.फार्मसी',               hi:'बी.फार्मेसी' },

  // ─── SINGLE WORDS (only match as whole words, never inside other words) ──────
  'Pharmaceutics':   { mr:'औषधनिर्माणशास्त्र',  hi:'फार्मास्यूटिक्स' },
  'Pharmacology':    { mr:'औषधशास्त्र',           hi:'फार्माकोलॉजी' },
  'Pharmacognosy':   { mr:'वनस्पती औषधशास्त्र',   hi:'फार्माकोग्नोसी' },
  'Pharmaceutical':  { mr:'औषधनिर्माण',           hi:'फार्मास्युटिकल' },
  'Administration':  { mr:'प्रशासन',              hi:'प्रशासन' },
  'Department':      { mr:'विभाग',                hi:'विभाग' },
  'Reception':       { mr:'स्वागत',               hi:'स्वागत' },
  'Warden':          { mr:'वॉर्डन',               hi:'वार्डन' },
  'Commerce':        { mr:'वाणिज्य',              hi:'वाणिज्य' },
  'Science':         { mr:'विज्ञान',              hi:'विज्ञान' },
  'Arts':            { mr:'कला',                  hi:'कला' },
  'Mechanical':      { mr:'यांत्रिक',             hi:'मैकेनिकल' },
  'Civil':           { mr:'स्थापत्य',             hi:'सिविल' },
  'Electrical':      { mr:'विद्युत',              hi:'इलेक्ट्रिकल' },
  'Electronics':     { mr:'इलेक्ट्रॉनिक्स',      hi:'इलेक्ट्रॉनिक्स' },
  'Engineering':     { mr:'अभियांत्रिकी',         hi:'इंजीनियरिंग' },
  'Pharmacy':        { mr:'फार्मसी',              hi:'फार्मेसी' },
  'Mathematics':     { mr:'गणित',                 hi:'गणित' },
  'Physics':         { mr:'भौतिकशास्त्र',         hi:'भौतिकी' },
  'Chemistry':       { mr:'रसायनशास्त्र',         hi:'रसायन विज्ञान' },
  'Biology':         { mr:'जीवशास्त्र',           hi:'जीव विज्ञान' },
  'Marathi':         { mr:'मराठी',                hi:'मराठी' },
  'Production':      { mr:'उत्पादन',              hi:'उत्पादन' },
  'Library':         { mr:'ग्रंथालय',             hi:'पुस्तकालय' },
  'Classrooms':      { mr:'वर्गखोल्या',           hi:'कक्षाएँ' },
  'Classroom':       { mr:'वर्गखोली',             hi:'कक्षा' },
  'Gymnasium':       { mr:'व्यायामशाळा',          hi:'व्यायामशाला' },
  'Canteen':         { mr:'कँटीन',                hi:'कैंटीन' },
  'Hostel':          { mr:'वसतिगृह',              hi:'छात्रावास' },
  'Mess':            { mr:'जेवणघर',               hi:'भोजनालय' },
  'Parking':         { mr:'पार्किंग',             hi:'पार्किंग' },
  'Workshop':        { mr:'कार्यशाळा',            hi:'कार्यशाला' },
  'Auditorium':      { mr:'सभागृह',               hi:'सभागार' },
  'Dispensary':      { mr:'दवाखाना',              hi:'औषधालय' },
  'Security':        { mr:'सुरक्षा',              hi:'सुरक्षा' },
  'Office':          { mr:'कार्यालय',             hi:'कार्यालय' },
  'Gate':            { mr:'दरवाजा',               hi:'द्वार' },
  'Ground':          { mr:'मैदान',                hi:'मैदान' },
  'Playground':      { mr:'खेळाचे मैदान',         hi:'खेल का मैदान' },
  'ATM':             { mr:'एटीएम',                hi:'एटीएम' },
  'Store':           { mr:'स्टोर',                hi:'स्टोर' },
  'Stationery':      { mr:'लेखनसामग्री',          hi:'स्टेशनरी' },
  'Rooms':           { mr:'खोल्या',               hi:'कमरे' },
  'Room':            { mr:'खोली',                 hi:'कमरा' },
  'Laundry':         { mr:'धुलाई सेवा',           hi:'लॉन्ड्री' },
  'Labs':            { mr:'प्रयोगशाळा',           hi:'प्रयोगशाला' },
  'Lab':             { mr:'प्रयोगशाळा',           hi:'लैब' },
  'Hall':            { mr:'सभागृह',               hi:'हॉल' },
  'Court':           { mr:'मैदान',                hi:'कोर्ट' },
  'Campus':          { mr:'कॅम्पस',               hi:'कैंपस' },
  'Services':        { mr:'सेवा',                 hi:'सेवाएँ' },
  'Events':          { mr:'कार्यक्रम',            hi:'कार्यक्रम' },
  'Stage':           { mr:'मंच',                  hi:'मंच' },
  'Seating':         { mr:'आसन व्यवस्था',         hi:'बैठने की व्यवस्था' },
  'Lighting':        { mr:'प्रकाश व्यवस्था',      hi:'प्रकाश व्यवस्था' },
  'Visitor':         { mr:'अभ्यागत',              hi:'आगंतुक' },
  'Cabin':           { mr:'केबिन',                hi:'केबिन' },
  'Sports':          { mr:'क्रीडा',               hi:'खेल' },
  'Cricket':         { mr:'क्रिकेट',              hi:'क्रिकेट' },
  'Football':        { mr:'फुटबॉल',               hi:'फुटबॉल' },
  'Athletics':       { mr:'अॅथलेटिक्स',           hi:'एथलेटिक्स' },
  'Gym':             { mr:'जिम',                  hi:'जिम' },
  'Snacks':          { mr:'नाश्ता',               hi:'नाश्ता' },
  'Beverages':       { mr:'पेय',                  hi:'पेय पदार्थ' },
  'Printing':        { mr:'मुद्रण',               hi:'प्रिंटिंग' },
  'Photocopying':    { mr:'झेरॉक्स',              hi:'फोटोकॉपी' },
  'Binding':         { mr:'बांधणी',               hi:'बाइंडिंग' },
  'Scanning':        { mr:'स्कॅनिंग',             hi:'स्कैनिंग' },
  'Xerox':           { mr:'झेरॉक्स',              hi:'फोटोकॉपी' },
  'Carpentry':       { mr:'सुतारकाम',             hi:'बढ़ईगीरी' },
  'BCA':             { mr:'बीसीए',                hi:'बीसीए' },
  'BBA':             { mr:'बीबीए',                hi:'बीबीए' },
  'MBA':             { mr:'एमबीए',                hi:'एमबीए' },
  'MCA':             { mr:'एमसीए',                hi:'एमसीए' },
  'CSE':             { mr:'सीएसई',                hi:'सीएसई' },
};

// Sort longest-first so multi-word phrases match before single words
const TERMS_SORTED = Object.entries(TERMS).sort((a,b) => b[0].length - a[0].length);

// Escape a string for use in a RegExp
function reEscape(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// Translate a tag term (e.g. department or facility chip)
// Uses exact whole-word matching to prevent "IT" inside "Kitchen" etc.
function translateTerm(term) {
  if (currentLang === 'en') return term;
  // 1. Exact match (case-insensitive)
  const exactKey = TERMS_SORTED.find(([k]) => k.toLowerCase() === term.toLowerCase());
  if (exactKey && exactKey[1][currentLang]) return exactKey[1][currentLang];
  // 2. Replace known phrases/words using \b word boundaries
  //    This prevents "IT" matching inside "Kitchen", "Committee", "activities" etc.
  let result = term;
  for (const [en, langs] of TERMS_SORTED) {
    if (!langs[currentLang]) continue;
    // Use \b for single-word terms, plain match for multi-word phrases
    const pat = en.includes(' ') || en.includes('-') || en.includes('/')
      ? new RegExp(reEscape(en), 'gi')
      : new RegExp('\\b' + reEscape(en) + '\\b', 'g');
    result = result.replace(pat, langs[currentLang]);
  }
  return result;
}

// Description phrase table — full sentences listed first (most specific)
const DESC_PHRASES = {
  mr: [
    ['named after Rajmata Jijau',       'राजमाता जिजाऊ यांच्या नावाने'],
    ['named after Savitribai Phule',     'सावित्रीबाई फुले यांच्या नावाने'],
    ['named after',                      'यांच्या नावाने'],
    ['Residential facility for female students', 'महिला विद्यार्थ्यांसाठी निवासी सुविधा'],
    ['Residential facility for male students',   'पुरुष विद्यार्थ्यांसाठी निवासी सुविधा'],
    ['Residential facility for students',        'विद्यार्थ्यांसाठी निवासी सुविधा'],
    ['Residential facility',             'निवासी सुविधा'],
    ['College offering programs in',     'महाविद्यालय कार्यक्रम देते'],
    ['college offering polytechnic programs', 'पॉलिटेक्निक कार्यक्रम देणारे महाविद्यालय'],
    ['offering undergraduate and postgraduate', 'पदवी आणि पदव्युत्तर कार्यक्रम देते'],
    ['outdoor games and physical activities', 'मैदानी खेळ आणि शारीरिक क्रियाकलाप'],
    ['sports activities and gatherings',  'क्रीडा क्रियाकलाप आणि सभा'],
    ['college events, seminars, cultural programs and convocations', 'महाविद्यालयीन कार्यक्रम, चर्चासत्र, सांस्कृतिक कार्यक्रम आणि दीक्षांत समारंभ'],
    ['Main dining facility for female students offering breakfast, lunch and dinner', 'महिला विद्यार्थ्यांसाठी मुख्य भोजन सुविधा - नाश्ता, दुपारचे जेवण आणि रात्रीचे जेवण'],
    ['Dedicated gym and sports court facility for female students', 'महिला विद्यार्थ्यांसाठी समर्पित जिम आणि क्रीडा सुविधा'],
    ['Scenic garden area',               'सुंदर बाग क्षेत्र'],
    ['great for relaxation and outdoor study sessions', 'विश्रांती आणि मैदानी अभ्यासासाठी उत्तम'],
    ['Main entrance gate to SVPM',       'एसव्हीपीएम चा मुख्य प्रवेश दरवाजा'],
    ['Starting point for all campus visits', 'सर्व कॅम्पस भेटींचा प्रारंभ बिंदू'],
    ['Entry gate to the hostel area',    'वसतिगृह क्षेत्राचा प्रवेश दरवाजा'],
    ['Security check point for hostel residents', 'वसतिगृह रहिवाशांसाठी सुरक्षा चेकपोस्ट'],
    ['Engineering workshop for practical training', 'व्यावहारिक प्रशिक्षणासाठी अभियांत्रिकी कार्यशाळा'],
    ['fabrication work',                 'निर्मिती काम'],
    ['Photocopying and printing center', 'झेरॉक्स आणि मुद्रण केंद्र'],
    ['to print notes, assignments and documents', 'नोट्स, असाइनमेंट आणि कागदपत्रे छापण्यासाठी'],
    ['Main parking area',                'मुख्य पार्किंग क्षेत्र'],
    ['staff and visitors vehicles',      'कर्मचारी आणि अभ्यागतांच्या गाड्या'],
    ['Main open ground used for',        'मुख्य मोकळे मैदान वापरले जाते'],
    ['SVPM College of Pharmacy offering', 'एसव्हीपीएम फार्मसी महाविद्यालय'],
    ['Main academic building',           'मुख्य शैक्षणिक इमारत'],
    ['Main college canteen serving',     'मुख्य महाविद्यालय कँटीन'],
    ['food and beverages for all students and staff', 'सर्व विद्यार्थी आणि कर्मचाऱ्यांसाठी जेवण आणि पेय'],
    ['in various engineering streams',   'विविध अभियांत्रिकी शाखांमध्ये'],
    ['practical training in mechanical, electrical and fabrication work', 'यांत्रिक, विद्युत आणि निर्मिती कामाचे व्यावहारिक प्रशिक्षण'],
    ['female students',                  'महिला विद्यार्थी'],
    ['male students',                    'पुरुष विद्यार्थी'],
    ['for girls',                        'मुलींसाठी'],
    ['for boys',                         'मुलांसाठी'],
    ['girls hostel',                     'मुलींचे वसतिगृह'],
    ['boys hostel',                      'मुलांचे वसतिगृह'],
    ['Located near',                     'जवळ स्थित'],
    ['Provides',                         'पुरवते'],
    ['streams',                          'शाखा'],
    ['facilities',                       'सुविधा'],
    ['services',                         'सेवा'],
    ['campus',                           'कॅम्पस'],
    ['students',                         'विद्यार्थी'],
    ['building',                         'इमारत'],
  ],
  hi: [
    ['named after Rajmata Jijau',        'राजमाता जिजाऊ के नाम पर'],
    ['named after Savitribai Phule',     'सावित्रीबाई फुले के नाम पर'],
    ['named after',                      'के नाम पर'],
    ['Residential facility for female students', 'महिला छात्रों के लिए आवासीय सुविधा'],
    ['Residential facility for male students',   'पुरुष छात्रों के लिए आवासीय सुविधा'],
    ['Residential facility for students',        'छात्रों के लिए आवासीय सुविधा'],
    ['Residential facility',             'आवासीय सुविधा'],
    ['College offering programs in',     'महाविद्यालय में कार्यक्रम'],
    ['college offering polytechnic programs', 'पॉलिटेक्निक कार्यक्रम देने वाला महाविद्यालय'],
    ['offering undergraduate and postgraduate', 'स्नातक और स्नातकोत्तर कार्यक्रम प्रदान करता है'],
    ['outdoor games and physical activities', 'मैदानी खेल और शारीरिक गतिविधियाँ'],
    ['sports activities and gatherings',  'खेल गतिविधियाँ और सभाएँ'],
    ['college events, seminars, cultural programs and convocations', 'महाविद्यालयीन कार्यक्रम, सेमिनार, सांस्कृतिक कार्यक्रम और दीक्षांत समारोह'],
    ['Main dining facility for female students offering breakfast, lunch and dinner', 'महिला छात्रों के लिए मुख्य भोजन सुविधा - नाश्ता, दोपहर का भोजन और रात का खाना'],
    ['Dedicated gym and sports court facility for female students', 'महिला छात्रों के लिए समर्पित जिम और खेल सुविधा'],
    ['Scenic garden area',               'सुंदर बगीचा क्षेत्र'],
    ['great for relaxation and outdoor study sessions', 'विश्राम और बाहरी अध्ययन के लिए उत्तम'],
    ['Main entrance gate to SVPM',       'एसवीपीएम का मुख्य प्रवेश द्वार'],
    ['Starting point for all campus visits', 'सभी कैंपस यात्राओं का प्रारंभ बिंदु'],
    ['Entry gate to the hostel area',    'छात्रावास क्षेत्र का प्रवेश द्वार'],
    ['Security check point for hostel residents', 'छात्रावास निवासियों के लिए सुरक्षा चेकपोस्ट'],
    ['Engineering workshop for practical training', 'व्यावहारिक प्रशिक्षण के लिए इंजीनियरिंग कार्यशाला'],
    ['fabrication work',                 'फैब्रिकेशन कार्य'],
    ['Photocopying and printing center', 'फोटोकॉपी और प्रिंटिंग केंद्र'],
    ['to print notes, assignments and documents', 'नोट्स, असाइनमेंट और दस्तावेज़ प्रिंट करने के लिए'],
    ['Main parking area',                'मुख्य पार्किंग क्षेत्र'],
    ['staff and visitors vehicles',      'कर्मचारियों और आगंतुकों के वाहन'],
    ['Main open ground used for',        'मुख्य खुला मैदान उपयोग किया जाता है'],
    ['SVPM College of Pharmacy offering', 'एसवीपीएम फार्मेसी कॉलेज'],
    ['Main academic building',           'मुख्य शैक्षणिक इमारत'],
    ['Main college canteen serving',     'मुख्य कॉलेज कैंटीन'],
    ['food and beverages for all students and staff', 'सभी छात्रों और कर्मचारियों के लिए भोजन और पेय'],
    ['in various engineering streams',   'विभिन्न इंजीनियरिंग शाखाओं में'],
    ['practical training in mechanical, electrical and fabrication work', 'मैकेनिकल, इलेक्ट्रिकल और फैब्रिकेशन का व्यावहारिक प्रशिक्षण'],
    ['female students',                  'महिला छात्र'],
    ['male students',                    'पुरुष छात्र'],
    ['for girls',                        'लड़कियों के लिए'],
    ['for boys',                         'लड़कों के लिए'],
    ['girls hostel',                     'लड़कियों का छात्रावास'],
    ['boys hostel',                      'लड़कों का छात्रावास'],
    ['Located near',                     'के पास स्थित'],
    ['Provides',                         'प्रदान करता है'],
    ['streams',                          'शाखाएँ'],
    ['facilities',                       'सुविधाएँ'],
    ['services',                         'सेवाएँ'],
    ['campus',                           'कैंपस'],
    ['students',                         'छात्र'],
    ['building',                         'इमारत'],
  ],
};

function translateDescription(text) {
  if (currentLang === 'en' || !text) return text;
  const phrases = DESC_PHRASES[currentLang];
  if (!phrases) return text;
  let result = text;
  // Apply full-sentence phrases in order (exact, case-insensitive)
  for (const [en, tr] of phrases) {
    result = result.replace(new RegExp(reEscape(en), 'gi'), tr);
  }
  // Then apply remaining TERMS using strict whole-word \b boundaries
  for (const [en, langs] of TERMS_SORTED) {
    if (!langs[currentLang]) continue;
    const pat = en.includes(' ') || en.includes('-') || en.includes('/')
      ? new RegExp(reEscape(en), 'gi')
      : new RegExp('\\b' + reEscape(en) + '\\b', 'gi');
    result = result.replace(pat, langs[currentLang]);
  }
  return result;
}

function setLang(lang) {
    currentLang = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(b => {
        const map = { en:'EN', mr:'मरा', hi:'हिं' };
        b.classList.toggle('active', b.textContent.trim() === map[lang]);
    });

    // ── Static elements with data-i18n ──
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (t(k) !== k) el.textContent = t(k);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const k = el.getAttribute('data-i18n-ph');
        if (t(k) !== k) el.placeholder = t(k);
    });

    // ── Drawer UI ──
    const loadingP = document.querySelector('#drawerLoading p');
    if (loadingP) loadingP.textContent = t('findingRoute');
    const errorP = document.querySelector('#drawerError p');
    if (errorP) errorP.innerHTML = t('noRoute').replace('\n','<br>');
    const cancelBtn = document.querySelector('.cancel-dir-btn');
    if (cancelBtn) cancelBtn.textContent = t('cancelRoute');
    const drawerTitle = document.querySelector('.dir-drawer-title');
    if (drawerTitle) drawerTitle.textContent = t('dirTitle');
    const hint = document.getElementById('drawerHint');
    if (hint) hint.textContent = t('swipeUp');

    // ── Go button ──
    const goBtn = document.getElementById('goBtn');
    if (goBtn) goBtn.textContent = t('getDir');

    // ── dir count ──
    const dirCountLabel = document.querySelector('#dirCount [data-i18n="locations"]');
    if (dirCountLabel) dirCountLabel.textContent = t('locations');

    // ── Re-render all dynamic lists so buttons/labels are translated ──
    renderMarkers(buildings.length ? buildings : []);
    renderDirectory(buildings.length ? buildings : []);
    renderAllLocList(buildings.length ? buildings : []);
    rebuildDropdowns();

    // ── If building sheet is open, re-render it in the new language ──
    const sheet = document.getElementById('buildingSheet');
    if (sheet && sheet.classList.contains('active')) {
        const currentId = sheet.getAttribute('data-current-id');
        if (currentId) openSheet(currentId);
    }

    // ── Active stat labels in open drawer ──
    const lbls = document.querySelectorAll('.dsm-lbl');
    if (lbls[0]) lbls[0].textContent = t('distance');
    if (lbls[1]) lbls[1].textContent = t('walkTime');
    if (lbls[2]) lbls[2].textContent = t('turns');

    toast('🌐 ' + (lang==='en'?'English':lang==='mr'?'मराठी':'हिंदी'), 'inf');
}


// Category mapping for filter
const CAT = {
    academic: ['engineering_college','diploma_engineering','pharmacy_college','electrical_dept','commerce_science'],
    hostel:   ['rajmata_hostel','savitribai_hostel','ahilyadevi_hostel','boys_hostel','hostel_gate'],
    food:     ['canteen','girls_mess','shree_mess'],
    sports:   ['basketball_court','play_ground','ground','main_ground','girls_gym'],
    services: ['xerox_center','parking_area','management_gate','workshop','main_gate'],
};

// ===== STATE =====
let map, streetTile, satTile;
let markersLayer, routeLayer, destMarker;
let autoFollow   = true;   // Fix 2: user can turn off auto-pan by dragging map
let routeCoords  = [];     // Fix 3: full route coordinate array for progress trimming
let passedIndex  = 0;      // Fix 3: how many coords the user has already passed
let currentDest  = null;   // stores destination building object for arrival detection
let arrivedShown = false;  // prevent showing arrival toast more than once
let buildings     = [];
let userLocation  = null;
let userMarker    = null;
let isSat         = false;
let selectedDest  = null;
let currentPage   = 'map';

// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    initMap();
    await loadBuildings();
    setupEvents();
    setupDrawerDrag();
    getUserLocation(null, true);
});

// ============================================================
// MAP
// ============================================================
function initMap() {
    map = L.map('map', {
        center: CENTER, zoom: 16,
        minZoom: 13, maxZoom: 21,
        zoomControl: true,
    });

    // Google Hybrid — satellite imagery WITH road labels (best of both worlds)
    streetTile = L.tileLayer(
        'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        subdomains:     ['0','1','2','3'],
        attribution:    '© Google Maps',
        maxZoom:        22,
        maxNativeZoom:  21,
    }).addTo(map);

    // CartoDB Dark — clean street view as the alternate tile
    satTile = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains:     'abcd',
        maxZoom:        22,
        maxNativeZoom:  21,
    });

    markersLayer = L.layerGroup().addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map);

    document.getElementById('globalLoading').classList.add('hidden');
}

// ============================================================
// DATA
// ============================================================
// Haversine distance in meters between two [lat,lng] points
function haversineM(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180;
    const dφ = (lat2 - lat1) * Math.PI / 180;
    const dλ = (lng2 - lng1) * Math.PI / 180;
    const a  = Math.sin(dφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(dλ/2)**2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ============================================================
// BUILDING NAME TRANSLATIONS
// Keys are exact English names from buildings.json
// ============================================================
const BUILDING_NAMES = {
  'Main Gate':                        { mr:'मुख्य दरवाजा',                    hi:'मुख्य द्वार' },
  'Main Ground':                      { mr:'मुख्य मैदान',                     hi:'मुख्य मैदान' },
  'Garden Area':                      { mr:'बाग क्षेत्र',                      hi:'बगीचा क्षेत्र' },
  'Auditorium':                       { mr:'सभागृह',                           hi:'सभागार' },
  'Hostel Gate':                      { mr:'वसतिगृह दरवाजा',                  hi:'छात्रावास द्वार' },
  'Rajmata Jijau Girls Hostel':       { mr:'राजमाता जिजाऊ मुलींचे वसतिगृह',   hi:'राजमाता जिजाऊ छात्रावास' },
  'Savitribai Phule Girls Hostel':    { mr:'सावित्रीबाई फुले मुलींचे वसतिगृह', hi:'सावित्रीबाई फुले छात्रावास' },
  'Ahilyadevi Girls Hostel':          { mr:'अहिल्यादेवी मुलींचे वसतिगृह',     hi:'अहिल्यादेवी छात्रावास' },
  'Boys Hostel':                      { mr:'मुलांचे वसतिगृह',                 hi:'लड़कों का छात्रावास' },
  'Girls Gym Court':                  { mr:'मुलींचे जिम मैदान',               hi:'लड़कियों का जिम कोर्ट' },
  "Chetana & SVPM's Girls Mess":      { mr:'चेतना व एसव्हीपीएम मुलींचे जेवणघर', hi:'चेतना व एसवीपीएम छात्रावास भोजनालय' },
  'SVPM College of Pharmacy':         { mr:'एसव्हीपीएम फार्मसी महाविद्यालय',  hi:'एसवीपीएम फार्मेसी कॉलेज' },
  'Play Ground Near Pharmacy College':{ mr:'फार्मसी महाविद्यालयाजवळचे मैदान', hi:'फार्मेसी कॉलेज के पास मैदान' },
  'Diploma College of Engineering':   { mr:'डिप्लोमा अभियांत्रिकी महाविद्यालय', hi:'डिप्लोमा इंजीनियरिंग कॉलेज' },
  'Workshop':                         { mr:'कार्यशाळा',                        hi:'कार्यशाला' },
  'Canteen':                          { mr:'कँटीन',                            hi:'कैंटीन' },
  'College of Engineering':           { mr:'अभियांत्रिकी महाविद्यालय',        hi:'इंजीनियरिंग कॉलेज' },
  'Play Ground Near Boys Hostel':     { mr:'मुलांच्या वसतिगृहाजवळचे मैदान',   hi:'लड़कों के छात्रावास के पास मैदान' },
  'Basketball Court':                 { mr:'बास्केटबॉल मैदान',                hi:'बास्केटबॉल कोर्ट' },
  'Parking Area':                     { mr:'पार्किंग क्षेत्र',                 hi:'पार्किंग क्षेत्र' },
  'Xerox Center':                     { mr:'झेरॉक्स केंद्र',                   hi:'फोटोकॉपी केंद्र' },
  'Dispensary':                       { mr:'दवाखाना',                          hi:'औषधालय' },
  'Security Office':                  { mr:'सुरक्षा कार्यालय',                 hi:'सुरक्षा कार्यालय' },
};

// Return a building's display name in the current language
function getBuildingName(b) {
  if (currentLang === 'en') return b.name;
  return (BUILDING_NAMES[b.name] && BUILDING_NAMES[b.name][currentLang]) || b.name;
}

async function loadBuildings() {
    const res  = await fetch('/api/buildings');
    const data = await res.json();
    buildings  = data.buildings || [];
    renderMarkers(buildings);
    renderDirectory(buildings);
    renderAllLocList(buildings);
    rebuildDropdowns();
    toast('✅ ' + buildings.length + ' ' + t('loaded'), 'ok');
}

// ============================================================
// DROPDOWNS — populate both map and navigate page dropdowns
// ============================================================
function rebuildDropdowns() {
    const opts = buildings.map(b =>
        `<option value="${b.id}">${b.icon||'🏢'} ${getBuildingName(b)}</option>`
    ).join('');
    const def = `<option value="">${t('dropdownDefault')}</option>`;
    ['locationDropdown','navLocationDropdown'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.innerHTML = def + opts; el.value = ''; }
    });
}
function dropdownPickLocation(id) {
    if (!id) return;
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    document.getElementById('locationDropdown').value = '';
    map.flyTo([b.coordinates.latitude, b.coordinates.longitude], 18, { duration: 1.2 });
}
function dropdownSelectDest(id) {
    if (!id) return;
    selectDest(id);
    document.getElementById('navLocationDropdown').value = '';
}

// ============================================================
// DIRECTION ARROW HUD
// ============================================================
let directionInterval = null;
let routeArrowMarker  = null;
let arrowVisible      = false;  // OFF by default
let _arrowDestCoords  = null;   // saved so toggle can restart

function startDirectionArrow(destCoords) {
    _arrowDestCoords = destCoords;
    arrowVisible     = false;          // always start hidden
    stopDirectionArrow();
    updateArrowToggleBtn();
}

function stopDirectionArrow() {
    if (directionInterval) { clearInterval(directionInterval); directionInterval = null; }
    if (routeArrowMarker)  { map.removeLayer(routeArrowMarker); routeArrowMarker = null; }
    arrowVisible = false;
    updateArrowToggleBtn();
}

function toggleDirectionArrow() {
    if (!_arrowDestCoords) return;
    arrowVisible = !arrowVisible;
    if (arrowVisible) {
        updateDirectionArrow(_arrowDestCoords);
        directionInterval = setInterval(() => updateDirectionArrow(_arrowDestCoords), 1000);
    } else {
        if (directionInterval) { clearInterval(directionInterval); directionInterval = null; }
        if (routeArrowMarker)  { map.removeLayer(routeArrowMarker); routeArrowMarker = null; }
    }
    updateArrowToggleBtn();
}

function updateArrowToggleBtn() {
    const btn = document.getElementById('btnArrowToggle');
    if (!btn) return;
    if (arrowVisible) {
        btn.style.background    = 'rgba(59,130,246,.2)';
        btn.style.borderColor   = 'rgba(59,130,246,.6)';
        btn.querySelector('svg').setAttribute('stroke', '#3B82F6');
    } else {
        btn.style.background    = 'rgba(100,116,139,.15)';
        btn.style.borderColor   = 'rgba(100,116,139,.3)';
        btn.querySelector('svg').setAttribute('stroke', '#94A3B8');
    }
}

function updateDirectionArrow(destCoords) {
    if (!userLocation) return;
    const from = userLocation;
    const to   = destCoords;

    // Bearing: user → destination
    const φ1 = from.latitude  * Math.PI / 180;
    const φ2 = to.latitude    * Math.PI / 180;
    const Δλ = (to.longitude - from.longitude) * Math.PI / 180;
    const y  = Math.sin(Δλ) * Math.cos(φ2);
    const x  = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
    const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;

    // Place/update a rotating arrow marker at user's position on the route
    const arrowHtml = `
        <div class="route-arrow-wrap" style="transform:rotate(${bearing}deg)">
            <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="rgba(11,15,26,.85)" stroke="#3B82F6" stroke-width="1.5"/>
                <polygon points="16,5 21,22 16,18 11,22" fill="#3B82F6" stroke="white" stroke-width="1"/>
            </svg>
        </div>`;

    const icon = L.divIcon({
        className: 'route-direction-arrow',
        html: arrowHtml,
        iconSize:   [36, 36],
        iconAnchor: [18, 18],
    });

    if (!routeArrowMarker) {
        routeArrowMarker = L.marker(
            [from.latitude, from.longitude],
            { icon, zIndexOffset: 800, interactive: false }
        ).addTo(map);
    } else {
        routeArrowMarker.setLatLng([from.latitude, from.longitude]);
        routeArrowMarker.setIcon(icon);
    }
}

// ── Drawer minimize ─────────────────────────────────────────────────────────
function minimizeDrawer() {
    const drawer = document.getElementById('dirDrawer');
    drawer.classList.remove('active', 'expanded');
    drawer.classList.add('mini');
}
function expandFromMini() {
    const drawer = document.getElementById('dirDrawer');
    drawer.classList.remove('mini', 'expanded');
    drawer.classList.add('active');
}


// ============================================================
// MARKERS
// ============================================================
function renderMarkers(list) {
    markersLayer.clearLayers();
    list.forEach(b => {
        const icon = L.divIcon({
            html: `<div style="font-size:28px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.8));">${b.icon||'🏢'}</div>`,
            className: 'custom-div-icon',
            iconSize: [36,36], iconAnchor: [18,36], popupAnchor: [0,-38],
        });
        const marker = L.marker([b.coordinates.latitude, b.coordinates.longitude], { icon });
        marker.bindPopup(`
            <div style="min-width:190px;padding:2px 0;">
                <div style="font-size:14px;font-weight:700;color:#F1F5F9;margin-bottom:4px;">${b.icon||''} ${b.name}</div>
                <div style="font-size:11px;color:#06B6D4;font-family:monospace;margin-bottom:10px;">${b.code||''}</div>
                <div style="display:flex;gap:7px;">
                    <button onclick="openSheet('${b.id}')" style="flex:1;padding:7px 4px;background:#1C2338;color:#F1F5F9;border:1px solid rgba(255,255,255,.1);border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">${t('btnInfo')}</button>
                    <button onclick="launchNavFromMap('${b.id}')" style="flex:1;padding:7px 4px;background:#3B82F6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">${t('btnGo')}</button>
                </div>
            </div>`);
        markersLayer.addLayer(marker);
    });
}

function filterMarkers(cat) {
    document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('pill' + capitalize(cat === 'all' ? 'all' : cat.slice(0,4))).classList.add('active');
    if (cat === 'all') { renderMarkers(buildings); return; }
    const ids  = CAT[cat] || [];
    const list = buildings.filter(b => ids.includes(b.id));
    renderMarkers(list.length ? list : buildings);
}

// ============================================================
// BOTTOM SHEET (building detail)
// ============================================================
function openSheet(id) {
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    map.closePopup();
    const depts = (b.departments||[]).map(d => `<span class="tag">${translateTerm(d)}</span>`).join('');
    const facs  = (b.facilities||[]).map(f => `<span class="tag">${translateTerm(f)}</span>`).join('');
    const desc  = translateDescription(b.description || '');
    document.getElementById('sheetBody').innerHTML = `
        ${b.image ? `<img src="${b.image}" class="sheet-img" alt="${b.name}">` : ''}
        <h2 class="sheet-title">${b.icon||''} ${b.name}</h2>
        ${b.code ? `<span class="sheet-code">${b.code}</span>` : ''}
        <p class="sheet-desc">${desc}</p>
        ${depts ? `<div class="sheet-section"><div class="sheet-section-title">${t('departments')}</div><div class="tags">${depts}</div></div>` : ''}
        ${facs  ? `<div class="sheet-section"><div class="sheet-section-title">${t('facilities')}</div><div class="tags">${facs}</div></div>`   : ''}
        ${b.floor_count ? `<div class="sheet-section"><div class="sheet-section-title">${t('buildingInfo')}</div><div class="tags"><span class="tag">🏢 ${b.floor_count} ${t('floors')}</span></div></div>` : ''}
        <div class="sheet-section">
            <div class="sheet-section-title">${t('gpsCoords')}</div>
            <div class="sheet-coords">📍 ${b.coordinates.latitude}, ${b.coordinates.longitude}</div>
        </div>
        <button class="sheet-nav-btn" onclick="closeSheet();launchNavFromMap('${b.id}')">${t('btnGetDir')}</button>`;
    document.getElementById('buildingSheet').classList.add('active');
    document.getElementById('buildingSheet').setAttribute('data-current-id', id);
    document.getElementById('sheetOverlay').classList.add('active');
    map.flyTo([b.coordinates.latitude, b.coordinates.longitude], 18, { duration: 1.2 });
}

function closeSheet() {
    document.getElementById('buildingSheet').classList.remove('active');
    document.getElementById('buildingSheet').removeAttribute('data-current-id');
    document.getElementById('sheetOverlay').classList.remove('active');
}

// ============================================================
// NAVIGATE FROM MAP (launches directions drawer)
// ============================================================
function launchNavFromMap(id) {
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    if (!userLocation) {
        toast(t('gettingLoc'), 'inf');
        getUserLocation(() => launchNavFromMap(id));
        return;
    }
    // Switch to map page first
    goPage('map', document.getElementById('navMap'));
    openDrawer(b);
    drawRoute(userLocation, b.coordinates, b);
}

// ============================================================
// DIRECTIONS DRAWER
// ============================================================
function openDrawer(b) {
    document.getElementById('drawerDest').textContent = t('toLabel') + b.name;
    document.getElementById('drawerSummary').style.display  = 'none';
    document.getElementById('drawerLoading').style.display  = 'flex';
    document.getElementById('drawerLoading').querySelector('p').textContent = t('findingRoute');
    document.getElementById('drawerError').style.display    = 'none';
    document.getElementById('drawerSteps').innerHTML        = '';
    document.getElementById('drawerFooter').style.display   = 'none';
    document.getElementById('drawerHint').style.display     = 'block';
    document.getElementById('drawerHint').textContent       = t('swipeUp');

    const drawer = document.getElementById('dirDrawer');
    drawer.classList.remove('expanded');
    drawer.classList.add('active');
    document.getElementById('fabSnapToMe').classList.add('active');

    // Start direction arrow HUD
    startDirectionArrow(b.coordinates);

    setTimeout(() => map.invalidateSize(), 420);
}

function closeDrawer() {
    const drawer = document.getElementById('dirDrawer');
    drawer.classList.remove('active', 'expanded', 'mini');
    stopDirectionArrow();
    autoFollow   = true;
    routeCoords  = [];
    passedIndex  = 0;
    currentDest  = null;
    arrivedShown = false;
    document.getElementById('fabCenter').classList.remove('follow-off');
    document.getElementById('fabSnapToMe').classList.remove('active');
    clearRoute();
}

// ── Arrival celebration ──────────────────────────────────────────────────────
function showArrivalScreen(building) {
    // 1. Close the directions drawer immediately (free the map)
    const drawer = document.getElementById('dirDrawer');
    drawer.classList.remove('active', 'expanded');
    stopDirectionArrow();
    clearRoute();

    // 2. Show full-screen arrival overlay
    const overlay = document.getElementById('arrivalOverlay');
    document.getElementById('arrivalIcon').textContent  = building.icon || '📍';
    document.getElementById('arrivalName').textContent  = building.name;

    const msgMap = {
        en: "You've arrived!",
        mr: "तुम्ही पोहोचलात!",
        hi: "आप पहुँच गए!",
    };
    document.getElementById('arrivalMsg').textContent = msgMap[currentLang] || msgMap.en;

    const subMap = {
        en: "Great job! You reached your destination.",
        mr: "शाब्बास! तुम्ही तुमच्या गंतव्यस्थानावर पोहोचलात.",
        hi: "शाबाश! आप अपने गंतव्य तक पहुँच गए।",
    };
    document.getElementById('arrivalSub').textContent = subMap[currentLang] || subMap.en;

    const btnMap = { en: 'Close', mr: 'बंद करा', hi: 'बंद करें' };
    document.getElementById('arrivalCloseBtn').textContent = btnMap[currentLang] || btnMap.en;

    overlay.classList.add('active');

    // 3. Confetti burst
    launchConfetti();

    // 4. Auto-dismiss after 6 seconds
    setTimeout(() => dismissArrival(), 6000);
}

function dismissArrival() {
    document.getElementById('arrivalOverlay').classList.remove('active');
    document.getElementById('fabSnapToMe').classList.remove('active');
    currentDest  = null;
    arrivedShown = false;
    routeCoords  = [];
    passedIndex  = 0;
    document.getElementById('fabCenter').classList.remove('follow-off');
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx    = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
        x:    Math.random() * canvas.width,
        y:    -20 - Math.random() * 80,
        r:    4 + Math.random() * 6,
        d:    Math.random() * 80 + 20,
        color: ['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#06B6D4','#F97316'][Math.floor(Math.random()*7)],
        tilt:  Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltSpeed: 0.1 + Math.random() * 0.1,
    }));

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.beginPath();
            ctx.lineWidth  = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
            p.tiltAngle  += p.tiltSpeed;
            p.y           += Math.cos(frame / 10 + p.d) + 2;
            p.x           += Math.sin(frame / 5) * 1.5;
            p.tilt         = Math.sin(p.tiltAngle) * 12;
            if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
        });
        frame++;
        if (frame < 180) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
}

async function drawRoute(from, to, building) {
    clearRoute();
    
    // ✨ UPGRADED: Beautiful gradient destination pin with drop animation
    const dicon = L.divIcon({
        html: `
            <div class="dest-marker-container">
                <div class="dest-pin"></div>
                <div class="dest-emoji">${building.icon||'🏢'}</div>
                <div class="dest-shadow"></div>
            </div>
            <style>
                .dest-marker-container {
                    width: 50px;
                    height: 60px;
                    position: relative;
                    animation: markerDrop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                @keyframes markerDrop {
                    0% { transform: translateY(-100px) scale(0); opacity: 0; }
                    60% { transform: translateY(5px) scale(1.1); }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
                .dest-pin {
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #0066FF 0%, #00D9FF 100%);
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    left: 7px;
                    top: 2px;
                    border: 3px solid white;
                    box-shadow: 0 4px 20px rgba(0, 102, 255, 0.6),
                                0 0 0 4px rgba(0, 102, 255, 0.2);
                }
                .dest-emoji {
                    position: absolute;
                    font-size: 18px;
                    left: 16px;
                    top: 10px;
                    z-index: 10;
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
                }
                .dest-shadow {
                    position: absolute;
                    width: 20px;
                    height: 8px;
                    background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%);
                    bottom: -5px;
                    left: 15px;
                    border-radius: 50%;
                }
            </style>`,
        className:'', 
        iconSize: [50, 60], 
        iconAnchor: [25, 55],
    });
    
    destMarker = L.marker([to.latitude, to.longitude], { icon: dicon, zIndexOffset: 900 }).addTo(map);

    // Try OSRM with increasing snap radii until a route is found
    // Small radius first (campus paths), then wider to catch nearby roads
    const snapRadii = ['50;50', '200;200', '500;500', 'unlimited;unlimited'];
    let data = null;
    for (const r of snapRadii) {
        try {
            const url = `${OSRM}${from.longitude},${from.latitude};${to.longitude},${to.latitude}?overview=full&geometries=geojson&steps=true&continue_straight=false&radiuses=${r}`;
            const res = await fetch(url);
            const d   = await res.json();
            if (d.code === 'Ok' && d.routes?.length) { data = d; break; }
        } catch (_) { /* try next radius */ }
    }
    try {
        if (!data) { drawStraightLineRoute(from, to, building); return; }
        const route = data.routes[0];
        const legs  = route.legs[0];
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);

        // ✨ UPGRADED: Thicker route line with smooth caps
        const line  = L.polyline(coords, { 
            color: '#0066FF', 
            weight: 6, 
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        // ✨ UPGRADED: Animated dashed overlay that moves!
        const dash  = L.polyline(coords, { 
            color: '#00D9FF', 
            weight: 3, 
            opacity: 0.8, 
            dashArray: '10, 15',
            dashOffset: '0',
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        // Animate the dashes to create movement effect
        let dashOffset = 0;
        const animateDash = setInterval(() => {
            dashOffset -= 1;
            dash.setStyle({ dashOffset: dashOffset });
        }, 50);
        
        routeLayer = { line, dash, animation: animateDash };
        routeCoords  = coords.slice();
        passedIndex  = 0;
        autoFollow   = true;
        currentDest  = building;
        arrivedShown = false;
        
        // Auto-zoom: bottom padding = peek height (178px) + nav bar (68px)
        setTimeout(() => {
            map.fitBounds(line.getBounds(), { 
                paddingTopLeft:     [60, 110],
                paddingBottomRight: [60, 246],
                maxZoom: 18,
                animate: true,
                duration: 1.0
            });
        }, 450);

        // Summary
        const dist = route.distance >= 1000 ? (route.distance/1000).toFixed(1)+' km' : Math.round(route.distance)+'m';
        const mins = Math.ceil(route.duration / 60);
        const time = mins < 60 ? mins+' min' : Math.floor(mins/60)+'h '+(mins%60)+'m';
        document.getElementById('dDist').textContent  = dist;
        document.getElementById('dTime').textContent  = time;
        // Mini-tab stats
        document.getElementById('miniDist').textContent = dist;
        document.getElementById('miniTime').textContent = time;
        const expandLbls = { en:'expand', mr:'उघडा', hi:'खोलें' };
        document.getElementById('miniExpandLabel').textContent = expandLbls[currentLang] || 'expand';
        document.getElementById('dTurns').textContent = legs.steps.length;
        document.getElementById('drawerSummary').style.display = 'flex';
        document.getElementById('drawerLoading').style.display = 'none';
        document.getElementById('drawerFooter').style.display  = 'block';
        document.getElementById('drawerHint').style.display    = 'block';
        // Translated stat labels
        const lbls = document.querySelectorAll('.dsm-lbl');
        if (lbls[0]) lbls[0].textContent = t('distance');
        if (lbls[1]) lbls[1].textContent = t('walkTime');
        if (lbls[2]) lbls[2].textContent = t('turns');
        document.querySelector('.cancel-dir-btn').textContent = t('cancelRoute');

        buildDrawerSteps(legs.steps, building);

    } catch (e) { console.error(e); drawStraightLineRoute(from, to, building); }
}

// Fallback when OSRM can't find a walking path — draw a straight dashed line
function drawStraightLineRoute(from, to, building) {
    const coords = [
        [from.latitude, from.longitude],
        [to.latitude,   to.longitude]
    ];

    const line = L.polyline(coords, {
        color: '#3B82F6', weight: 4, opacity: 0.7,
        dashArray: '12, 10', lineCap: 'round'
    }).addTo(map);

    const dash = L.polyline(coords, {
        color: '#00D9FF', weight: 2, opacity: 0.6,
        dashArray: '8, 14', dashOffset: '0', lineCap: 'round'
    }).addTo(map);

    let dashOffset = 0;
    const animation = setInterval(() => { dashOffset -= 1; dash.setStyle({ dashOffset }); }, 50);

    routeLayer   = { line, dash, animation };
    routeCoords  = coords.slice();
    passedIndex  = 0;
    autoFollow   = true;
    currentDest  = building;
    arrivedShown = false;

    map.fitBounds(L.latLngBounds(coords), {
        paddingTopLeft: [60,110], paddingBottomRight: [60,246],
        maxZoom: 18, animate: true, duration: 1.0
    });

    const dist   = haversineM(from.latitude, from.longitude, to.latitude, to.longitude);
    const distTx = dist >= 1000 ? (dist/1000).toFixed(1)+' km' : Math.round(dist)+'m';
    const mins   = Math.ceil(dist / 80);
    const timeTx = mins < 60 ? mins+' min' : Math.floor(mins/60)+'h '+(mins%60)+'m';

    document.getElementById('dDist').textContent  = distTx;
    document.getElementById('dTime').textContent  = timeTx;
    document.getElementById('dTurns').textContent = '—';
    document.getElementById('miniDist').textContent = distTx;
    document.getElementById('miniTime').textContent = timeTx;
    document.getElementById('drawerSummary').style.display = 'flex';
    document.getElementById('drawerLoading').style.display = 'none';
    document.getElementById('drawerError').style.display   = 'none';
    document.getElementById('drawerFooter').style.display  = 'block';
    document.getElementById('drawerHint').style.display    = 'block';
    document.getElementById('drawerHint').textContent      = t('swipeUp');

    const lbls = document.querySelectorAll('.dsm-lbl');
    if (lbls[0]) lbls[0].textContent = t('distance');
    if (lbls[1]) lbls[1].textContent = t('walkTime');
    if (lbls[2]) lbls[2].textContent = t('turns');

    const note = {
        en: 'No road data for this area. Head straight toward the destination marker.',
        mr: 'या क्षेत्रासाठी रस्त्याची माहिती नाही. गंतव्य मार्करच्या दिशेने थेट जा.',
        hi: 'इस क्षेत्र के लिए सड़क की जानकारी नहीं है। गंतव्य मार्कर की ओर सीधे जाएं।'
    };
    document.getElementById('drawerSteps').innerHTML = `
        <div style="padding:14px 16px;display:flex;gap:12px;align-items:flex-start;border-bottom:1px solid var(--border2);">
            <span style="font-size:20px;flex-shrink:0;">🟢</span>
            <div style="font-size:13px;color:var(--t2);line-height:1.5;">${note[currentLang]||note.en}</div>
        </div>
        <div style="padding:14px 16px;display:flex;gap:12px;align-items:center;">
            <span style="font-size:20px;flex-shrink:0;">📍</span>
            <b style="font-size:13px;">${building.name}</b>
        </div>`;

    document.querySelector('.cancel-dir-btn').textContent = t('cancelRoute');
    startDirectionArrow(building.coordinates);
}

const STEP_ICONS = {
    merge:'↗️', fork:'⑂', roundabout:'🔄', rotary:'🔄',
    'exit roundabout':'↗️', 'end of road':'⬆️',
    turn: { left:'⬅️', right:'➡️', 'slight left':'↖️', 'slight right':'↗️', 'sharp left':'↩️', 'sharp right':'↪️', straight:'⬆️', uturn:'🔃' }
};
function stepIcon(type, mod) {
    if (type === 'turn') return STEP_ICONS.turn[mod] || '➡️';
    return STEP_ICONS[type] || (STEP_ICONS.turn[mod] || '➡️');
}
function buildDrawerSteps(steps, building) {
    document.getElementById('drawerSteps').innerHTML = steps.map((s, i) => {
        const type  = s.maneuver?.type || '';
        const mod   = s.maneuver?.modifier || '';
        const icon  = stepIcon(type, mod);
        const dist  = s.distance > 0 ? (s.distance >= 1000 ? (s.distance/1000).toFixed(1)+' km' : Math.round(s.distance)+'m') : '';
        const start = type === 'depart';
        const end   = type === 'arrive';
        let text = s.name
            ? (type === 'turn' ? 'Turn ' + mod : capitalize(type)) + ' on <b>' + s.name + '</b>'
            : capitalize(type || 'Continue');
        if (start) text = '<b>🟢 ' + t('startWalk') + '</b>';
        if (end)   text = '<b>📍 ' + t('arrived') + ' ' + building.name + '!</b>';
        
        // ✨ UPGRADED: Interactive steps with hover effects
        return `<div class="step-row ${start?'s-start':''} ${end?'s-end':''}" 
                     style="cursor:pointer;transition:all 0.2s;"
                     onmouseover="this.style.background='rgba(0,102,255,0.12)'"
                     onmouseout="this.style.background='transparent'">
            <div class="step-n">${start?'▶': end?'🏁': i}</div>
            <div class="step-ic">${icon}</div>
            <div class="step-tx">
                <div class="step-main">${text}</div>
                ${dist ? `<div class="step-d">${dist}</div>` : ''}
            </div></div>`;
    }).join('');
}
function clearRoute() {
    if (routeLayer) { 
        map.removeLayer(routeLayer.line); 
        map.removeLayer(routeLayer.dash);
        if (routeLayer.animation) clearInterval(routeLayer.animation); // Stop animation
        routeLayer = null; 
    }
    if (destMarker) { map.removeLayer(destMarker); destMarker = null; }
}
function showDrawerError() {
    document.getElementById('drawerLoading').style.display = 'none';
    document.getElementById('drawerError').style.display   = 'block';
}

// ============================================================
// PAGE 3 — NAVIGATE (standalone directions page)
// ============================================================
let navDestTimer;
document.getElementById('navDestInput').addEventListener('input', e => {
    clearTimeout(navDestTimer);
    const q = e.target.value.trim();
    if (q.length < 2) { document.getElementById('destResults').innerHTML=''; return; }
    navDestTimer = setTimeout(async () => {
        const r = await fetch('/api/search?q=' + encodeURIComponent(q));
        const d = await r.json();
        document.getElementById('destResults').innerHTML = d.results.slice(0, 6).map(b =>
            `<div class="dest-result-item" onclick="selectDest('${b.id}')">
                <span style="font-size:20px;">${b.icon||'🏢'}</span>
                <div><div style="font-size:13px;font-weight:600;">${b.name}</div>
                <div style="font-size:11px;color:#06B6D4;font-family:monospace;">${b.code||''}</div></div>
            </div>`).join('');
    }, 280);
});

function selectDest(id) {
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    selectedDest = b;
    document.getElementById('destResults').innerHTML = '';
    document.getElementById('navDestInput').value    = '';
    document.getElementById('destChosen').style.display = 'flex';
    document.getElementById('destChosen').innerHTML = `
        <span class="dest-chosen-icon">${b.icon||'🏢'}</span>
        <div><div class="dest-chosen-name">${b.name}</div>
        <div class="dest-chosen-code">${b.code||''}</div></div>
        <button class="dest-chosen-clear" onclick="clearDest()">✕</button>`;
}
function clearDest() {
    selectedDest = null;
    document.getElementById('destChosen').style.display = 'none';
    document.getElementById('destChosen').innerHTML = '';
    document.getElementById('dirResult').style.display = 'none';
}

async function startDirections() {
    if (!selectedDest) { toast(t('chooseDest'), 'err'); return; }
    if (!userLocation) {
        toast(t('gettingLoc'), 'inf');
        getUserLocation(startDirections);
        return;
    }
    // ✨ Google Maps style: switch to map page and open route drawer immediately
    goPage('map', document.getElementById('navMap'));
    setTimeout(() => launchNavFromMap(selectedDest.id), 250);
}

// ============================================================
// DRAWER DRAG-TO-EXPAND (Google Maps style)
// ============================================================
function setupDrawerDrag() {
    const drawer = document.getElementById('dirDrawer');
    const handle = document.getElementById('drawerHandle');
    const hint   = document.getElementById('drawerHint');
    if (!handle) return;

    let startY = 0, dragging = false;

    function setExpanded(expand) {
        drawer.classList.toggle('expanded', expand);
        if (hint) hint.style.display = expand ? 'none' : 'block';
        setTimeout(() => {
            map.invalidateSize();
            if (routeLayer) {
                const bottomPad = expand ? Math.round(window.innerHeight * 0.72) + 68 : 246;
                map.fitBounds(routeLayer.line.getBounds(), {
                    paddingTopLeft: [60, 110],
                    paddingBottomRight: [60, bottomPad],
                    maxZoom: 18, animate: true, duration: 0.4
                });
            }
        }, 420);
    }

    // Click handle to toggle expanded
    handle.addEventListener('click', () => {
        setExpanded(!drawer.classList.contains('expanded'));
    });

    // Touch drag: swipe up to expand, swipe down to collapse
    handle.addEventListener('touchstart', e => {
        startY = e.touches[0].clientY;
        dragging = true;
    }, { passive: true });

    handle.addEventListener('touchmove', e => {
        if (!dragging) return;
        const dy = startY - e.touches[0].clientY;
        if (dy > 50 && !drawer.classList.contains('expanded')) {
            setExpanded(true); dragging = false;
        } else if (dy < -50 && drawer.classList.contains('expanded')) {
            setExpanded(false); dragging = false;
        }
    }, { passive: true });

    handle.addEventListener('touchend', () => { dragging = false; });
}

// ============================================================
// DIRECTORY PAGE
// ============================================================
function renderDirectory(list) {
    const countEl = document.getElementById('dirCountNum');
    if (countEl) countEl.textContent = list.length;
    document.getElementById('dirList').innerHTML = list.map(b => `
        <div class="dir-card" id="dc-${b.id}">
            <div class="dir-card-icon">${b.icon||'🏢'}</div>
            <div class="dir-card-body">
                <div class="dir-card-name">${b.name}</div>
                <div class="dir-card-code">${b.code||''}</div>
                <div class="dir-card-desc">${translateDescription((b.description||'').slice(0,60))}...</div>
            </div>
            <div class="dir-card-actions">
                <button class="dca-btn dca-info" onclick="openSheet('${b.id}')">${t('btnInfo')}</button>
                <button class="dca-btn dca-nav"  onclick="launchNavFromMap('${b.id}')">${t('btnGo')}</button>
            </div>
        </div>`).join('');
}

let dirSearchTimer;
document.getElementById('dirSearchInput').addEventListener('input', e => {
    clearTimeout(dirSearchTimer);
    dirSearchTimer = setTimeout(async () => {
        const q = e.target.value.trim();
        if (!q) { renderDirectory(buildings); return; }
        const r = await fetch('/api/search?q=' + encodeURIComponent(q));
        const d = await r.json();
        renderDirectory(d.results);
    }, 280);
});

function dirFilter(cat, btn) {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    if (cat === 'all') { renderDirectory(buildings); return; }
    const ids  = CAT[cat] || [];
    const list = buildings.filter(b => ids.includes(b.id));
    renderDirectory(list.length ? list : buildings);
}

// ============================================================
// INFO PAGE — all locations list
// ============================================================
function renderAllLocList(list) {
    document.getElementById('allLocList').innerHTML = list.map(b => `
        <div class="all-loc-item" onclick="goPage('map',document.getElementById('navMap'));setTimeout(()=>{ map.flyTo([${b.coordinates.latitude},${b.coordinates.longitude}],18);openSheet('${b.id}'); },300)">
            <div class="all-loc-icon">${b.icon||'🏢'}</div>
            <div class="all-loc-name">${b.name}</div>
            <div class="all-loc-code">${b.code||''}</div>
        </div>`).join('');
}

// ============================================================
// USER LOCATION
// ============================================================
function getUserLocation(cb, silent) {

    if (!navigator.geolocation) {
        toast('Geolocation not supported', 'err');
        return;
    }

    navigator.geolocation.getCurrentPosition(pos => {

        userLocation = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        };

        // IMPROVED USER LOCATION MARKER with heading cone + accuracy ring
        const pIcon = L.divIcon({
            html: `
                <div class="user-location-marker">
                    <div class="user-accuracy-ring"></div>
                    <div class="user-pulse"></div>
                    <div class="user-pulse pulse-2"></div>
                    <div class="user-dot-wrap" id="userDotWrap">
                        <div class="user-heading-cone"></div>
                        <div class="user-dot"></div>
                    </div>
                </div>
            `,
            className: '',
            iconSize: [50,50],
            iconAnchor: [25,25]
        });

        // Try to get device heading (compass) for directional arrow
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                const heading = e.webkitCompassHeading || (e.alpha ? (360 - e.alpha) : null);
                if (heading == null) return;
                const wrap = document.getElementById('userDotWrap');
                if (wrap) {
                    wrap.classList.add('has-heading');
                    wrap.style.transform = `rotate(${heading}deg)`;
                }
            }, { passive: true });
        }

        if (userMarker) {

            userMarker.setLatLng([
                userLocation.latitude,
                userLocation.longitude
            ]);

        } else {

            userMarker = L.marker([
                userLocation.latitude,
                userLocation.longitude
            ], {
                icon: pIcon,
                zIndexOffset: 1000
            })
            .bindPopup('📍 You are here')
            .addTo(map);

        }

        // CENTER MAP FIRST TIME
        map.setView([
            userLocation.latitude,
            userLocation.longitude
        ], 17);

        document.getElementById('locStatus').textContent = '✅ ' + t('locFound').replace('📍 ','');
        setFabLocState('found');

        if (!silent)
            toast(t('locFound'), 'ok');

        if (cb)
            cb();


        /* ---------------------------------------
           LIVE LOCATION TRACKING
           --------------------------------------- */

        navigator.geolocation.watchPosition(pos => {

            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            userLocation = {
                latitude: lat,
                longitude: lng
            };

            if (userMarker) {
                userMarker.setLatLng([lat, lng]);
            }

            if (routeLayer) {
                // ── Arrival detection ─────────────────────────────────────────
                if (currentDest && !arrivedShown) {
                    const distToDest = haversineM(
                        lat, lng,
                        currentDest.coordinates.latitude,
                        currentDest.coordinates.longitude
                    );
                    if (distToDest < 20) {   // within 20 m = arrived
                        arrivedShown = true;
                        showArrivalScreen(currentDest);
                        return;
                    }
                }

                // ── Trim passed route segments ────────────────────────────────
                if (routeCoords.length > 2) {
                    let closestIdx = passedIndex;
                    let closestDist = Infinity;
                    const searchTo = Math.min(routeCoords.length - 1, passedIndex + 30);
                    for (let i = passedIndex; i <= searchTo; i++) {
                        const d = haversineM(lat, lng, routeCoords[i][0], routeCoords[i][1]);
                        if (d < closestDist) { closestDist = d; closestIdx = i; }
                    }
                    if (closestDist < 25 && closestIdx > passedIndex) {
                        passedIndex = closestIdx;
                        const remaining = [[lat, lng], ...routeCoords.slice(passedIndex)];
                        if (remaining.length >= 2) {
                            routeLayer.line.setLatLngs(remaining);
                            routeLayer.dash.setLatLngs(remaining);
                        }
                    }
                }

                // ── Auto-pan only if follow mode is on ────────────────────────
                if (autoFollow) {
                    map.panTo([lat, lng], { animate: true, duration: 0.4 });
                }
            }

        }, err => {
            console.log('Live tracking error', err);
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        });


    }, () => {

        document.getElementById('locStatus').textContent = '❌ ' + t('locDenied');

        if (!silent)
            toast(t('locDenied'), 'err');

    }, {
        enableHighAccuracy: true,
        timeout: 10000
    });

}

// ============================================================
// MAP SEARCH (on map page)
// ============================================================
let mapSearchTimer;
document.getElementById('mapSearchInput').addEventListener('input', e => {
    clearTimeout(mapSearchTimer);
    const q   = e.target.value.trim();
    const box = document.getElementById('mapSearchResults');
    if (q.length < 2) { box.innerHTML=''; return; }
    mapSearchTimer = setTimeout(async () => {
        const r = await fetch('/api/search?q=' + encodeURIComponent(q));
        const d = await r.json();
        box.innerHTML = d.results.slice(0,6).map(b =>
            `<div class="srd-item" onclick="mapSearchPick('${b.id}')">
                <span class="srd-icon">${b.icon||'🏢'}</span>
                <div><div class="srd-name">${b.name}</div><div class="srd-code">${b.code||''}</div></div>
            </div>`).join('');
    }, 280);
});
function mapSearchPick(id) {
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    document.getElementById('mapSearchResults').innerHTML = '';
    document.getElementById('mapSearchInput').value = '';
    map.flyTo([b.coordinates.latitude, b.coordinates.longitude], 18, { duration: 1.2 });
    // Sheet only opens when user explicitly taps the marker popup, not on search
}
// Close dropdown on outside click
document.addEventListener('click', e => {
    if (!e.target.closest('.map-search-inner')) {
        document.getElementById('mapSearchResults').innerHTML = '';
    }
});

// ============================================================
// PAGE NAVIGATION
// ============================================================
function goPage(name, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    btn.classList.add('active');
    currentPage = name;
    // Resize map when returning to map tab
    if (name === 'map') setTimeout(() => map.invalidateSize(), 50);
}

// ============================================================
// EVENTS
// ============================================================
function setupEvents() {
    document.getElementById('headerLocBtn').addEventListener('click', () => getUserLocation(null, false));

    // ── Drag → free-pan mode ──
    map.on('dragstart', () => {
        if (routeLayer) {
            autoFollow = false;
            document.getElementById('fabCenter').classList.add('follow-off');
        }
    });

    // ── My Location FAB — 3 states like Google Maps ──
    // State 1: no GPS yet    → grey, tap to request GPS
    // State 2: GPS found     → blue, tap to fly to user
    // State 3: navigating + user dragged → orange ring, tap to re-follow
    document.getElementById('fabCenter').addEventListener('click', () => {
        autoFollow = true;
        document.getElementById('fabCenter').classList.remove('follow-off');

        if (!userLocation) {
            // No GPS — animate loading state, then request
            setFabLocState('loading');
            getUserLocation(() => {
                setFabLocState('found');
                map.flyTo([userLocation.latitude, userLocation.longitude], 18, {
                    animate: true, duration: 0.9, easeLinearity: 0.25
                });
            }, false);
        } else {
            // GPS known — smooth fly to user
            setFabLocState('found');
            map.flyTo([userLocation.latitude, userLocation.longitude], 18, {
                animate: true, duration: 0.9, easeLinearity: 0.25
            });
        }
    });

    // ── Fit-all FAB: zoom to show every building ──
    document.getElementById('fabFitAll').addEventListener('click', () => {
        if (!buildings.length) return;
        const latlngs = buildings.map(b => [b.coordinates.latitude, b.coordinates.longitude]);
        const bounds  = L.latLngBounds(latlngs);
        map.flyToBounds(bounds, {
            paddingTopLeft:     [40, 80],
            paddingBottomRight: [40, 80],
            maxZoom: 17,
            animate: true,
            duration: 0.9,
        });
        toast('🗺️ ' + t('showingAll'), 'inf');
    });

    // ── Snap-to-me FAB: shows during navigation, snaps map to user position ──
    document.getElementById('fabSnapToMe').addEventListener('click', () => {
        if (!userLocation) {
            toast(t('gettingLoc'), 'inf');
            return;
        }
        autoFollow = true;
        document.getElementById('fabCenter').classList.remove('follow-off');
        // Fit both user and destination in view if available
        if (currentDest) {
            const bounds = L.latLngBounds([
                [userLocation.latitude, userLocation.longitude],
                [currentDest.coordinates.latitude, currentDest.coordinates.longitude]
            ]);
            map.flyToBounds(bounds, {
                paddingTopLeft:     [60, 110],
                paddingBottomRight: [60, 260],
                maxZoom: 18,
                animate: true,
                duration: 0.8,
            });
        } else {
            map.flyTo([userLocation.latitude, userLocation.longitude], 18, {
                animate: true, duration: 0.8, easeLinearity: 0.25
            });
        }
    });

    document.getElementById('fabSat').addEventListener('click', () => {
        isSat = !isSat;
        document.getElementById('fabSat').classList.toggle('active', isSat);
        if (isSat) { map.removeLayer(streetTile); satTile.addTo(map); toast('🗺️ Dark street view', 'inf'); }
        else        { map.removeLayer(satTile); streetTile.addTo(map); toast('🛰️ Satellite + roads', 'inf'); }
    });
}

// ── FAB location button state helper ──────────────────────────────────────────
function setFabLocState(state) {
    const fab   = document.getElementById('fabCenter');
    const pulse = document.getElementById('fabLocPulse');
    fab.classList.remove('loc-loading', 'loc-found', 'loc-follow');
    if (state === 'loading') fab.classList.add('loc-loading');
    if (state === 'found')   fab.classList.add('loc-found');
    if (state === 'follow')  fab.classList.add('loc-follow');
}

// ============================================================
// UTILS
// ============================================================
function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
function toast(msg, type) {
    const w = document.getElementById('toastWrap');
    const t = document.createElement('div');
    t.className = 'toast ' + (type||'inf');
    t.textContent = msg;
    w.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(() => t.remove(), 300); }, 3000);
}

window.openSheet        = openSheet;
window.closeSheet       = closeSheet;
window.launchNavFromMap  = launchNavFromMap;
window.filterMarkers    = filterMarkers;
window.goPage           = goPage;
window.selectDest       = selectDest;
window.clearDest        = clearDest;
window.startDirections  = startDirections;
window.mapSearchPick    = mapSearchPick;
window.dirFilter        = dirFilter;
window.closeDrawer          = closeDrawer;
window.minimizeDrawer       = minimizeDrawer;
window.expandFromMini       = expandFromMini;
window.toggleDirectionArrow = toggleDirectionArrow;
window.dismissArrival       = dismissArrival;
window.setLang          = setLang;
window.dropdownPickLocation = dropdownPickLocation;
window.dropdownSelectDest   = dropdownSelectDest;