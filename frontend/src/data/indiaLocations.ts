/**
 * States / union territories of India and their cities, for the Register Log
 * entry form dropdowns. Every state lists all of its district headquarters plus
 * other large cities; Maharashtra also lists the towns around Pandharpur.
 * Cities are sorted A–Z, except that Maharashtra keeps Palawi's nearest cities first.
 * The form also offers "Other" so a city or village missing here can be typed in.
 */
const RAW_LOCATIONS: Record<string, string[]> = {
  'Andhra Pradesh': [
    'Adoni', 'Amalapuram', 'Anakapalli', 'Anantapur', 'Bapatla', 'Bhimavaram', 'Chilakaluripet', 'Chirala',
    'Chittoor', 'Dharmavaram', 'Eluru', 'Gudivada', 'Guntakal', 'Guntur', 'Hindupur', 'Kadapa', 'Kakinada',
    'Kavali', 'Kurnool', 'Machilipatnam', 'Madanapalle', 'Nandyal', 'Narasaraopet', 'Nellore', 'Ongole',
    'Paderu', 'Parvathipuram', 'Proddatur', 'Puttaparthi', 'Rajahmundry', 'Rayachoti', 'Srikakulam',
    'Srikalahasti', 'Tadepalligudem', 'Tenali', 'Tirupati', 'Vijayawada', 'Visakhapatnam', 'Vizianagaram',
  ],
  'Arunachal Pradesh': [
    'Aalo', 'Anini', 'Basar', 'Bomdila', 'Changlang', 'Daporijo', 'Hawai', 'Itanagar', 'Jamin', 'Khonsa',
    'Koloriang', 'Likabali', 'Longding', 'Naharlagun', 'Namsai', 'Pasighat', 'Roing', 'Seppa', 'Tato',
    'Tawang', 'Tezu', 'Yachuli', 'Yingkiong', 'Ziro',
  ],
  'Assam': [
    'Amingaon', 'Barpeta', 'Biswanath Chariali', 'Bongaigaon', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Diphu',
    'Goalpara', 'Golaghat', 'Guwahati', 'Haflong', 'Hailakandi', 'Hamren', 'Hatsingimari', 'Hojai', 'Jorhat',
    'Kajalgaon', 'Karimganj', 'Kokrajhar', 'Majuli', 'Mangaldai', 'Morigaon', 'Mushalpur', 'Nagaon',
    'Nalbari', 'North Lakhimpur', 'Pathsala', 'Silchar', 'Sivasagar', 'Sonari', 'Tamulpur', 'Tezpur',
    'Tinsukia', 'Udalguri',
  ],
  'Bihar': [
    'Araria', 'Arrah', 'Arwal', 'Aurangabad', 'Bagaha', 'Banka', 'Begusarai', 'Bettiah', 'Bhabua',
    'Bhagalpur', 'Bihar Sharif', 'Buxar', 'Chhapra', 'Darbhanga', 'Dehri', 'Gaya', 'Gopalganj', 'Hajipur',
    'Jamui', 'Jehanabad', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani',
    'Motihari', 'Munger', 'Muzaffarpur', 'Nawada', 'Patna', 'Purnia', 'Saharsa', 'Samastipur', 'Sasaram',
    'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul',
  ],
  'Chhattisgarh': [
    'Ambikapur', 'Baikunthpur', 'Balod', 'Baloda Bazar', 'Balrampur', 'Bemetara', 'Bhilai', 'Bijapur',
    'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela', 'Jagdalpur', 'Janjgir',
    'Jashpur Nagar', 'Kanker', 'Kawardha', 'Khairagarh', 'Kondagaon', 'Korba', 'Mahasamund', 'Manendragarh',
    'Mohla', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Sarangarh', 'Sukma',
    'Surajpur',
  ],
  'Goa': [
    'Bicholim', 'Canacona', 'Curchorem', 'Mapusa', 'Margao', 'Panaji', 'Pernem', 'Ponda', 'Quepem',
    'Sanguem', 'Valpoi', 'Vasco da Gama',
  ],
  'Gujarat': [
    'Ahmedabad', 'Ahwa', 'Amreli', 'Anand', 'Ankleshwar', 'Bharuch', 'Bhavnagar', 'Bhuj', 'Botad',
    'Chhota Udaipur', 'Dahod', 'Deesa', 'Dwarka', 'Gandhidham', 'Gandhinagar', 'Godhra', 'Gondal',
    'Himmatnagar', 'Jamnagar', 'Jetpur', 'Junagadh', 'Khambhalia', 'Lunawada', 'Mehsana', 'Modasa', 'Morbi',
    'Nadiad', 'Navsari', 'Palanpur', 'Patan', 'Porbandar', 'Rajkot', 'Rajpipla', 'Surat', 'Surendranagar',
    'Vadodara', 'Valsad', 'Vapi', 'Veraval', 'Vyara',
  ],
  'Haryana': [
    'Ambala', 'Bahadurgarh', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hansi',
    'Hisar', 'Jagadhri', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Narnaul', 'Nuh', 'Palwal',
    'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar',
  ],
  'Himachal Pradesh': [
    'Baddi', 'Bilaspur', 'Chamba', 'Dalhousie', 'Dharamshala', 'Hamirpur', 'Kangra', 'Keylong', 'Kullu',
    'Manali', 'Mandi', 'Nahan', 'Palampur', 'Reckong Peo', 'Shimla', 'Solan', 'Sundernagar', 'Una',
  ],
  'Jharkhand': [
    'Adityapur', 'Bokaro Steel City', 'Chaibasa', 'Chatra', 'Daltonganj', 'Deoghar', 'Dhanbad', 'Dumka',
    'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamshedpur', 'Jamtara', 'Khunti', 'Koderma',
    'Latehar', 'Lohardaga', 'Pakur', 'Phusro', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela', 'Simdega',
  ],
  'Karnataka': [
    'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru', 'Bhadravati', 'Bidar', 'Chamarajanagar',
    'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga', 'Davanagere', 'Dharwad', 'Gadag', 'Gangavathi',
    'Hassan', 'Haveri', 'Hosapete', 'Hubballi', 'Kalaburagi', 'Karwar', 'Kolar', 'Koppal', 'Madikeri',
    'Mandya', 'Mangaluru', 'Mysuru', 'Raichur', 'Ramanagara', 'Robertsonpet', 'Shivamogga', 'Tumakuru',
    'Udupi', 'Vijayapura', 'Yadgir',
  ],
  'Kerala': [
    'Alappuzha', 'Changanassery', 'Kakkanad', 'Kalpetta', 'Kannur', 'Kasaragod', 'Kayamkulam', 'Kochi',
    'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Painavu', 'Palakkad', 'Pathanamthitta', 'Ponnani',
    'Thalassery', 'Thiruvananthapuram', 'Thrissur', 'Tirur',
  ],
  'Madhya Pradesh': [
    'Agar', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal',
    'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna',
    'Gwalior', 'Harda', 'Indore', 'Itarsi', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Maihar',
    'Mandla', 'Mandsaur', 'Mauganj', 'Morena', 'Narmadapuram', 'Narsinghpur', 'Neemuch', 'Niwari',
    'Pandhurna', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni',
    'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha',
    'Waidhan',
  ],
  'Maharashtra': [
    'Ahilyanagar (Ahmednagar)', 'Akkalkot', 'Akluj', 'Akola', 'Amravati', 'Baramati', 'Barshi', 'Beed',
    'Bhandara', 'Bhiwandi', 'Buldhana', 'Chandrapur', 'Chhatrapati Sambhajinagar (Aurangabad)',
    'Dharashiv (Osmanabad)', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Ichalkaranji', 'Jalgaon', 'Jalna',
    'Kalyan-Dombivli', 'Karmala', 'Kolhapur', 'Kurduwadi', 'Latur', 'Madha', 'Malegaon', 'Malshiras',
    'Mangalwedha', 'Mira-Bhayandar', 'Mohol', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik',
    'Navi Mumbai', 'Palghar', 'Panvel', 'Parbhani', 'Pimpri-Chinchwad', 'Raigad (Alibag)', 'Ratnagiri',
    'Sangli', 'Sangola', 'Satara', 'Shirdi', 'Sindhudurg (Oros)', 'Thane', 'Ulhasnagar', 'Vasai-Virar',
    'Wardha', 'Washim', 'Yavatmal',
  ],
  'Manipur': [
    'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi',
    'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul',
  ],
  'Meghalaya': [
    'Ampati', 'Baghmara', 'Jowai', 'Khliehriat', 'Mairang', 'Mawkyrwat', 'Nongpoh', 'Nongstoin',
    'Resubelpara', 'Shillong', 'Tura', 'Williamnagar',
  ],
  'Mizoram': [
    'Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha',
    'Saitual', 'Serchhip',
  ],
  'Nagaland': [
    'Chümoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Niuland', 'Noklak',
    'Peren', 'Phek', 'Shamator', 'Tseminyü', 'Tuensang', 'Wokha', 'Zunheboto',
  ],
  'Odisha': [
    'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Baripada', 'Berhampur', 'Bhadrak', 'Bhawanipatna',
    'Bhubaneswar', 'Boudh', 'Chhatrapur', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Jagatsinghpur', 'Jajpur',
    'Jeypore', 'Jharsuguda', 'Kendrapara', 'Keonjhar', 'Khordha', 'Koraput', 'Malkangiri', 'Nabarangpur',
    'Nayagarh', 'Nuapada', 'Paradip', 'Paralakhemundi', 'Phulbani', 'Puri', 'Rayagada', 'Rourkela',
    'Sambalpur', 'Sonepur', 'Sundargarh', 'Talcher',
  ],
  'Punjab': [
    'Abohar', 'Amritsar', 'Barnala', 'Batala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka',
    'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Khanna', 'Ludhiana', 'Malerkotla',
    'Mansa', 'Moga', 'Mohali', 'Nawanshahr', 'Pathankot', 'Patiala', 'Phagwara', 'Rajpura', 'Rupnagar',
    'Sangrur', 'Sri Muktsar Sahib', 'Tarn Taran',
  ],
  'Rajasthan': [
    'Ajmer', 'Alwar', 'Balotra', 'Banswara', 'Baran', 'Barmer', 'Beawar', 'Bharatpur', 'Bhilwara',
    'Bhiwadi', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Deeg', 'Dholpur', 'Didwana',
    'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur',
    'Karauli', 'Khairthal', 'Kishangarh', 'Kota', 'Kotputli', 'Mount Abu', 'Nagaur', 'Pali', 'Phalodi',
    'Pratapgarh', 'Rajsamand', 'Salumbar', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk',
    'Udaipur',
  ],
  'Sikkim': ['Gangtok', 'Gyalshing', 'Mangan', 'Namchi', 'Pakyong', 'Soreng'],
  'Tamil Nadu': [
    'Ariyalur', 'Avadi', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
    'Erode', 'Hosur', 'Kallakurichi', 'Kanchipuram', 'Karur', 'Krishnagiri', 'Kumbakonam', 'Madurai',
    'Mayiladuthurai', 'Nagapattinam', 'Nagercoil', 'Namakkal', 'Ooty (Udhagamandalam)', 'Perambalur',
    'Pollachi', 'Pudukkottai', 'Ramanathapuram', 'Rameswaram', 'Ranipet', 'Salem', 'Sivaganga', 'Sivakasi',
    'Tambaram', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
    'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram',
    'Virudhunagar',
  ],
  'Telangana': [
    'Adilabad', 'Asifabad', 'Bhongir', 'Bhupalpally', 'Bodhan', 'Gadwal', 'Hanamkonda', 'Hyderabad',
    'Jagtial', 'Jangaon', 'Kamareddy', 'Karimnagar', 'Khammam', 'Kothagudem', 'Mahabubabad', 'Mahabubnagar',
    'Mancherial', 'Medak', 'Medchal', 'Miryalaguda', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet',
    'Nirmal', 'Nizamabad', 'Peddapalli', 'Ramagundam', 'Sangareddy', 'Secunderabad', 'Siddipet', 'Sircilla',
    'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal',
  ],
  'Tripura': [
    'Agartala', 'Ambassa', 'Belonia', 'Bishramganj', 'Dharmanagar', 'Kailashahar', 'Khowai', 'Udaipur',
  ],
  'Uttar Pradesh': [
    'Agra', 'Akbarpur', 'Aligarh', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat',
    'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bhinga',
    'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad',
    'Fatehpur', 'Firozabad', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Greater Noida', 'Hamirpur',
    'Hapur', 'Hardoi', 'Hathras', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur', 'Kasganj', 'Khalilabad',
    'Lakhimpur', 'Lalitpur', 'Loni', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Manjhanpur', 'Mathura',
    'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Naugarh', 'Noida', 'Orai', 'Padrauna',
    'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Robertsganj', 'Saharanpur', 'Sambhal',
    'Shahjahanpur', 'Shamli', 'Sitapur', 'Sultanpur', 'Unnao', 'Varanasi', 'Vrindavan',
  ],
  'Uttarakhand': [
    'Almora', 'Bageshwar', 'Champawat', 'Dehradun', 'Gopeshwar', 'Haldwani', 'Haridwar', 'Kashipur',
    'Kotdwar', 'Mussoorie', 'Nainital', 'New Tehri', 'Pauri', 'Pithoragarh', 'Rishikesh', 'Roorkee',
    'Rudraprayag', 'Rudrapur', 'Uttarkashi',
  ],
  'West Bengal': [
    'Alipore', 'Alipurduar', 'Asansol', 'Baharampur', 'Balurghat', 'Bankura', 'Barasat', 'Bardhaman',
    'Chinsurah', 'Cooch Behar', 'Darjeeling', 'Durgapur', 'English Bazar (Malda)', 'Haldia', 'Howrah',
    'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kharagpur', 'Kolkata', 'Krishnanagar', 'Medinipur', 'Purulia',
    'Raiganj', 'Siliguri', 'Suri', 'Tamluk',
  ],
  // Union territories
  'Andaman and Nicobar Islands': ['Car Nicobar', 'Mayabunder', 'Port Blair (Sri Vijaya Puram)'],
  'Chandigarh': ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
  'Delhi': ['Delhi', 'New Delhi'],
  'Jammu and Kashmir': [
    'Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar',
    'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Sopore',
    'Srinagar', 'Udhampur',
  ],
  'Ladakh': ['Kargil', 'Leh'],
  'Lakshadweep': ['Agatti', 'Kavaratti', 'Minicoy'],
  'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
};

/** Cities listed first for their state, ahead of the A–Z list: Palawi is in Pandharpur. */
const PINNED_CITIES: Record<string, string[]> = {
  'Maharashtra': ['Pandharpur', 'Solapur', 'Pune', 'Mumbai'],
};

export const INDIA_LOCATIONS: Record<string, string[]> = Object.fromEntries(
  Object.entries(RAW_LOCATIONS).map(([state, cities]) => {
    const pinned = PINNED_CITIES[state] ?? [];
    const rest = [...new Set(cities)]
      .filter((c) => !pinned.includes(c))
      .sort((a, b) => a.localeCompare(b));
    return [state, [...pinned, ...rest]];
  }),
);

export const INDIA_STATES = Object.keys(INDIA_LOCATIONS).sort((a, b) => a.localeCompare(b));

/** State preselected on the form: Palawi is in Pandharpur. */
export const DEFAULT_STATE = 'Maharashtra';
