export interface GateRegisterRecord {
  id: string;
  srNo: number;
  date: string;
  visitorName: string;
  dateOfBirth: string;
  mobileNo: string;
  address: string;
  remarks: string;
  extraRemark: string;
}

export const AUTHENTIC_GATE_REGISTER: GateRegisterRecord[] = [
  // --- SEPTEMBER 2026 (Descending: 30-Sep down to 01-Sep) ---
  // 30-Sep-26
  { id: 'gate_sep30_1', srNo: 1, date: '30-Sep-26', visitorName: 'Ganesh Kadam', dateOfBirth: '1/6/1977', mobileNo: '9270604757', address: 'Velapur', remarks: 'Visit', extraRemark: 'Keli denaysathi' },
  { id: 'gate_sep30_2', srNo: 2, date: '30-Sep-26', visitorName: 'Sushant Yalamar', dateOfBirth: '12/2/2003', mobileNo: '8177840493', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Ganesh Kadam' },
  { id: 'gate_sep30_3', srNo: 3, date: '30-Sep-26', visitorName: 'Megharaj Deshmukh', dateOfBirth: '1/1/2002', mobileNo: '9322636006', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Ganesh Kadam' },
  { id: 'gate_sep30_4', srNo: 4, date: '30-Sep-26', visitorName: 'Abhay Kadam', dateOfBirth: '26/10/2004', mobileNo: '9529282968', address: 'Velapur', remarks: 'Accompany Visitor', extraRemark: 'Came with Ganesh Kadam' },
  { id: 'gate_sep30_5', srNo: 5, date: '30-Sep-26', visitorName: 'Kiran Koli', dateOfBirth: '15/7/1990', mobileNo: '9763952822', address: 'Natepute', remarks: 'Visit', extraRemark: 'Admishon sndhrbhat bolnyasathi' },

  // 29-Sep-26
  { id: 'gate_sep29_1', srNo: 1, date: '29-Sep-26', visitorName: 'Aaditya Joshi', dateOfBirth: 'N/A', mobileNo: '9822148144', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'june kapade deneya sathi' },
  { id: 'gate_sep29_2', srNo: 2, date: '29-Sep-26', visitorName: 'Avinash Kokare', dateOfBirth: '28/7/1997', mobileNo: '7972320079', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Shale sndharbhat bhetnaysathi' },

  // 28-Sep-26
  { id: 'gate_sep28_1', srNo: 1, date: '28-Sep-26', visitorName: 'Vedant Karnde', dateOfBirth: '1/9/2007', mobileNo: '9226049421', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'June Kapade denaysathi' },
  { id: 'gate_sep28_2', srNo: 2, date: '28-Sep-26', visitorName: 'Vedant Karnde', dateOfBirth: '1/10/1982', mobileNo: '9623958910', address: 'Malegav', remarks: 'Visit', extraRemark: 'Pratham bhet' },
  { id: 'gate_sep28_3', srNo: 3, date: '28-Sep-26', visitorName: 'Sapana Shrama', dateOfBirth: '12/7/1984', mobileNo: '9373254369', address: 'Malegav', remarks: 'Visit', extraRemark: 'Pratham bhet' },
  { id: 'gate_sep28_4', srNo: 4, date: '28-Sep-26', visitorName: 'Jitedra Shrama', dateOfBirth: '1/1/1990', mobileNo: '9623958910', address: 'Malegav', remarks: 'Visit', extraRemark: 'Pratham bhet' },
  { id: 'gate_sep28_5', srNo: 5, date: '28-Sep-26', visitorName: 'Shobha Vadd', dateOfBirth: 'N/A', mobileNo: '7028401579', address: 'Kolhapur', remarks: 'Student Reletive', extraRemark: 'Amruta vadd hila Ghevun janyasathi ghari' },
  { id: 'gate_sep28_6', srNo: 6, date: '28-Sep-26', visitorName: 'Rohit Gayakwad', dateOfBirth: '1/7/1997', mobileNo: '9561864957', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep28_7', srNo: 7, date: '28-Sep-26', visitorName: 'Neha Inamdar', dateOfBirth: '2/2/2005', mobileNo: '9011367949', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'June kapde denaya sathi' },

  // 27-Sep-26
  { id: 'gate_sep27_1', srNo: 1, date: '27-Sep-26', visitorName: 'Mahesh Shelke', dateOfBirth: '8/10/1997', mobileNo: '8379884646', address: 'Gopalpur', remarks: 'Donation', extraRemark: 'June kapade denayasathi' },
  { id: 'gate_sep27_2', srNo: 2, date: '27-Sep-26', visitorName: 'Shnehal Hubale', dateOfBirth: '24/9/1994', mobileNo: '9373145915', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Mahesh shelke' },
  { id: 'gate_sep27_3', srNo: 3, date: '27-Sep-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Khedbhoshe', remarks: 'Maintenance', extraRemark: 'Laight cha kaam karnyasathi aale hote' },
  { id: 'gate_sep27_4', srNo: 4, date: '27-Sep-26', visitorName: 'Raju Choudhari', dateOfBirth: 'N/A', mobileNo: '9689136725', address: 'Solapur', remarks: 'Visit', extraRemark: 'Yoagita Apana ghar hila bhetnya sathi' },
  { id: 'gate_sep27_5', srNo: 5, date: '27-Sep-26', visitorName: 'Laksxman Kamble', dateOfBirth: '2/6/1975', mobileNo: '9693026129', address: 'Shripur', remarks: 'Donation', extraRemark: 'dhanya denyasathi' },
  { id: 'gate_sep27_6', srNo: 6, date: '27-Sep-26', visitorName: 'Pranjali Doshi', dateOfBirth: '24/8/1987', mobileNo: '8380069966', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Raincoat and stole denyasathi' },
  { id: 'gate_sep27_7', srNo: 7, date: '27-Sep-26', visitorName: 'Kimaya Doshi', dateOfBirth: '10/6/1988', mobileNo: '9665512012', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Pranjali Doshi' },
  { id: 'gate_sep27_8', srNo: 8, date: '27-Sep-26', visitorName: 'Sanshul Doshi', dateOfBirth: '19/8/2014', mobileNo: '8380069966', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Pranjali Doshi' },
  { id: 'gate_sep27_9', srNo: 9, date: '27-Sep-26', visitorName: 'Aanya Doshi', dateOfBirth: '20/11/2018', mobileNo: '9665512012', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Pranjali Doshi' },

  // 26-Sep-26
  { id: 'gate_sep26_1', srNo: 1, date: '26-Sep-26', visitorName: 'Amit Shah', dateOfBirth: '7/7/1982', mobileNo: '9136650318', address: 'Mumbai', remarks: 'Donation', extraRemark: 'Aai la bhetnyasathi' },
  { id: 'gate_sep26_2', srNo: 2, date: '26-Sep-26', visitorName: 'Devdatta Deshpande', dateOfBirth: '18/1/1976', mobileNo: '9619744123', address: 'Mumbai', remarks: 'Accompany Visitor', extraRemark: 'Came with Amit shah' },
  { id: 'gate_sep26_3', srNo: 3, date: '26-Sep-26', visitorName: 'Sagar Khandekar', dateOfBirth: '10/11/2003', mobileNo: '8379023790', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Solar chek karne sathi' },
  { id: 'gate_sep26_4', srNo: 4, date: '26-Sep-26', visitorName: 'Samarh Yadav', dateOfBirth: '27/8/2004', mobileNo: '9527736274', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Came With Sagar khandekar' },
  { id: 'gate_sep26_5', srNo: 5, date: '26-Sep-26', visitorName: 'Rajan Deshamukh', dateOfBirth: '19/6/1995', mobileNo: '9421293322', address: 'Tisangi', remarks: 'Visit', extraRemark: 'Tejas ghadage yanya bhetnyasathi' },
  { id: 'gate_sep26_6', srNo: 6, date: '26-Sep-26', visitorName: 'Raujeet Kadaw', dateOfBirth: '20/8/1995', mobileNo: '9665981003', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Rajan Deshmukh' },
  { id: 'gate_sep26_7', srNo: 7, date: '26-Sep-26', visitorName: 'Rudra Kale', dateOfBirth: '20/5/2008', mobileNo: 'N/A', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Rajan Deshmukh' },
  { id: 'gate_sep26_8', srNo: 8, date: '26-Sep-26', visitorName: 'Priyanka Shedege', dateOfBirth: '16/12/1993', mobileNo: '9822332926', address: 'Aram', remarks: 'Donation', extraRemark: 'June kapade denyasathi' },
  { id: 'gate_sep26_9', srNo: 9, date: '26-Sep-26', visitorName: 'Ganesh Waghmare', dateOfBirth: '16/4/2002', mobileNo: '9156313908', address: 'Korti', remarks: 'Donation', extraRemark: 'Shillak jevan denaysahti' },
  { id: 'gate_sep26_10', srNo: 10, date: '26-Sep-26', visitorName: 'Tegar Dhope', dateOfBirth: '21/8/2010', mobileNo: '9156313908', address: 'Korti', remarks: 'Donation', extraRemark: 'Came with Ganesh Waghmare' },
  { id: 'gate_sep26_11', srNo: 11, date: '26-Sep-26', visitorName: 'Shriram Dethe', dateOfBirth: '11/6/1998', mobileNo: '9970065980', address: 'Dhondewadi', remarks: 'Accompany Visitor', extraRemark: 'Came with Kishor pawar' },
  { id: 'gate_sep26_12', srNo: 12, date: '26-Sep-26', visitorName: 'Sambhaji Dethe', dateOfBirth: '1/6/1981', mobileNo: '8806141580', address: 'Dhondewadi', remarks: 'Accompany Visitor', extraRemark: 'Came with Kishor pawar' },
  { id: 'gate_sep26_13', srNo: 13, date: '26-Sep-26', visitorName: 'Kishor Pawar', dateOfBirth: '25/9/2004', mobileNo: '9130107277', address: 'Khedbhose', remarks: 'Birthday Celebration', extraRemark: 'baday nimitt dhanya denyasathi' },
  { id: 'gate_sep26_14', srNo: 14, date: '26-Sep-26', visitorName: 'Satish Pawar', dateOfBirth: '2/2/1986', mobileNo: '9834999150', address: 'Khedbhose', remarks: 'Accompany Visitor', extraRemark: 'Came with Kishor pawar' },
  { id: 'gate_sep26_15', srNo: 15, date: '26-Sep-26', visitorName: 'Sangita Sarvale', dateOfBirth: '8/5/1988', mobileNo: '9307914493', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Kishor pawar' },

  // 25-Sep-26
  { id: 'gate_sep25_1', srNo: 1, date: '25-Sep-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Bhose', remarks: 'Maintenance', extraRemark: 'Laight cha kaam karnyasathi aale hote' },
  { id: 'gate_sep25_2', srNo: 2, date: '25-Sep-26', visitorName: 'Nagnath Nagre', dateOfBirth: '25/9/1956', mobileNo: '9822512698', address: 'Vakhari', remarks: 'Donation', extraRemark: 'given donation meal for birthday' },
  { id: 'gate_sep25_3', srNo: 3, date: '25-Sep-26', visitorName: 'Abhijit Rajguru', dateOfBirth: '19/8/1984', mobileNo: '9890635581', address: 'Mangalvedha', remarks: 'Donation', extraRemark: 'June kapade Denaysahti' },
  { id: 'gate_sep25_4', srNo: 4, date: '25-Sep-26', visitorName: 'Vankatesh Mule', dateOfBirth: '25/9/1994', mobileNo: '9011962624', address: 'Pandharpur', remarks: 'Birthday Celebration', extraRemark: 'Vankatesh Mule yancha vaddivasanimit khau denaysathi' },
  { id: 'gate_sep25_5', srNo: 5, date: '25-Sep-26', visitorName: 'Dattathry Kulkarni', dateOfBirth: '1/6/1965', mobileNo: 'N/A', address: 'Adhiv', remarks: 'Accompany Visitor', extraRemark: 'Came with Vankatesh Mule' },
  { id: 'gate_sep25_6', srNo: 6, date: '25-Sep-26', visitorName: 'Nilesh Thorat', dateOfBirth: '14/4/1998', mobileNo: '9881148702', address: 'Gopalpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Vankatesh Mule' },
  { id: 'gate_sep25_7', srNo: 7, date: '25-Sep-26', visitorName: 'Akash Sinde', dateOfBirth: '14/5/1998', mobileNo: '8380996297', address: 'Gopalpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Vankatesh Mule' },
  { id: 'gate_sep25_8', srNo: 8, date: '25-Sep-26', visitorName: 'Nilesh Pawar', dateOfBirth: '14/5/2008', mobileNo: '9284152131', address: 'Gopalpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Vankatesh Mule' },
  { id: 'gate_sep25_9', srNo: 9, date: '25-Sep-26', visitorName: 'Kartik Pawar', dateOfBirth: '4/9/2009', mobileNo: '9881887331', address: 'Gopalpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Vankatesh Mule' },
  { id: 'gate_sep25_10', srNo: 10, date: '25-Sep-26', visitorName: 'Prthamesh Nagarkar', dateOfBirth: '11/12/2003', mobileNo: '7620920827', address: 'Karkamb', remarks: 'Donation', extraRemark: 'Kai.Ganesh Deshamukh yancha samrnarth dhany ,fhal denaysathi' },
  { id: 'gate_sep25_11', srNo: 11, date: '25-Sep-26', visitorName: 'Nikhil Chwan', dateOfBirth: '4/1/2003', mobileNo: '9175699497', address: 'Karkamb', remarks: 'Accompany Visitor', extraRemark: 'Came with Dattattry deshmukh' },
  { id: 'gate_sep25_12', srNo: 12, date: '25-Sep-26', visitorName: 'Pradip Vyavahare', dateOfBirth: '1/3/2008', mobileNo: '8459717066', address: 'Karkamb', remarks: 'Accompany Visitor', extraRemark: 'Came with Dattattry deshmukh' },
  { id: 'gate_sep25_13', srNo: 13, date: '25-Sep-26', visitorName: 'Amit Ghodake', dateOfBirth: '20/10/2003', mobileNo: '9373738991', address: 'Karkamb', remarks: 'Accompany Visitor', extraRemark: 'Came with Dattattry deshmukh' },
  { id: 'gate_sep25_14', srNo: 14, date: '25-Sep-26', visitorName: 'Rohan Khote', dateOfBirth: '3/4/2004', mobileNo: '8600081165', address: 'Karkamb', remarks: 'Accompany Visitor', extraRemark: 'Came with Dattattry deshmukh' },
  { id: 'gate_sep25_15', srNo: 15, date: '25-Sep-26', visitorName: 'Dattatry Deshmukh', dateOfBirth: '1/6/1981', mobileNo: '9730810289', address: 'Karkamb', remarks: 'Accompany Visitor', extraRemark: 'Came with Dattattry deshmukh' },
  { id: 'gate_sep25_16', srNo: 16, date: '25-Sep-26', visitorName: 'Nandini Deshmukh', dateOfBirth: '21/2/1985', mobileNo: '9730810289', address: 'Karkamb', remarks: 'Accompany Visitor', extraRemark: 'Came with Dattattry deshmukh' },

  // 24-Sep-26
  { id: 'gate_sep24_1', srNo: 1, date: '24-Sep-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Bhose', remarks: 'Maintenance', extraRemark: 'Maintenance work' },
  { id: 'gate_sep24_2', srNo: 2, date: '24-Sep-26', visitorName: 'Shivaji shinde', dateOfBirth: '2/6/1967', mobileNo: '9028876566', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Laadu Denyasathi aale' },
  { id: 'gate_sep24_3', srNo: 3, date: '24-Sep-26', visitorName: 'Kusum Ingale', dateOfBirth: '24/9/1985', mobileNo: '9011227721', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Laadu Denyasathi aale' },

  // 23-Sep-26
  { id: 'gate_sep23_1', srNo: 1, date: '23-Sep-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Bhose', remarks: 'Maintenance', extraRemark: 'Laight cha kaam karnyasathi aale hote' },
  { id: 'gate_sep23_2', srNo: 2, date: '23-Sep-26', visitorName: 'Asmita Deshmukh', dateOfBirth: '1/1/1986', mobileNo: '9075057251', address: 'Indapur', remarks: 'Visit', extraRemark: 'Sanjay kale Yanchya admission sathi aale hote' },
  { id: 'gate_sep23_3', srNo: 3, date: '23-Sep-26', visitorName: 'Sneha Ingole', dateOfBirth: '26/4/2004', mobileNo: '8421839285', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Doantion' },
  { id: 'gate_sep23_4', srNo: 4, date: '23-Sep-26', visitorName: 'Tukaram Waghmode', dateOfBirth: '17/11/1991', mobileNo: '9922511514', address: 'Korti', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep23_5', srNo: 5, date: '23-Sep-26', visitorName: 'Siddu Mai', dateOfBirth: '2/10/2005', mobileNo: '9036712759', address: 'solapur', remarks: 'Student Reletive', extraRemark: 'Aishwaryala bhetnaysathi' },
  { id: 'gate_sep23_6', srNo: 6, date: '23-Sep-26', visitorName: 'Dattatrya thorat', dateOfBirth: '30/1/1962', mobileNo: '8888571617', address: 'Natepute', remarks: 'Donation', extraRemark: '140 bedsheet donation' },
  { id: 'gate_sep23_7', srNo: 7, date: '23-Sep-26', visitorName: 'Sanjay Pabale', dateOfBirth: '16/4/1964', mobileNo: '9422567841', address: 'Natepute', remarks: 'Visit', extraRemark: 'visit' },

  // 22-Sep-26
  { id: 'gate_sep22_1', srNo: 1, date: '22-Sep-26', visitorName: 'Nilfes Pathan', dateOfBirth: '26/11/1983', mobileNo: '9145087899', address: 'Solapur', remarks: 'Visit', extraRemark: 'old clothes denyasathi' },
  { id: 'gate_sep22_2', srNo: 2, date: '22-Sep-26', visitorName: 'Shahid Shaikh', dateOfBirth: '26/4/2002', mobileNo: '9822523152', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Motor reparing' },
  { id: 'gate_sep22_3', srNo: 3, date: '22-Sep-26', visitorName: 'Aamjad Inamdar', dateOfBirth: '4/10/2026', mobileNo: '9767238918', address: 'Kasegaon', remarks: 'Donation', extraRemark: 'Given fruit' },
  { id: 'gate_sep22_4', srNo: 4, date: '22-Sep-26', visitorName: 'Sohel mujawar', dateOfBirth: '5/6/1998', mobileNo: '9730145700', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'taken payment' },
  { id: 'gate_sep22_5', srNo: 5, date: '22-Sep-26', visitorName: 'Raajabai Takale', dateOfBirth: '1/6/1978', mobileNo: '9168332899', address: 'Gopalpur', remarks: 'Visit', extraRemark: 'Deepachay lagnasathi shital kaku la bhetayla aale hote' },
  { id: 'gate_sep22_6', srNo: 6, date: '22-Sep-26', visitorName: 'Pradnya Davane', dateOfBirth: '11/10/2007', mobileNo: '9146706512', address: 'Eklaaspur', remarks: 'Accompany Visitor', extraRemark: 'came with Raajabai Takale' },
  { id: 'gate_sep22_7', srNo: 7, date: '22-Sep-26', visitorName: 'Mangesh Salunkhe', dateOfBirth: '2/10/1996', mobileNo: '9970918105', address: 'Giravi', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep22_8', srNo: 8, date: '22-Sep-26', visitorName: 'Kiran Shinde', dateOfBirth: '2/5/1994', mobileNo: '8284040313', address: 'Giravi', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep22_9', srNo: 9, date: '22-Sep-26', visitorName: 'Vinod Nibalkar', dateOfBirth: '16/10/1985', mobileNo: '9881550189', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Kahu denyasathi' },
  { id: 'gate_sep22_10', srNo: 10, date: '22-Sep-26', visitorName: 'Bappu Hantade', dateOfBirth: 'N/A', mobileNo: '9922331528', address: 'Vakhari', remarks: 'Visit', extraRemark: 'taken payment' },
  { id: 'gate_sep22_11', srNo: 11, date: '22-Sep-26', visitorName: 'Tom Leanitt', dateOfBirth: '28/8/1955', mobileNo: '9567562903', address: 'Canada', remarks: 'Visit', extraRemark: 'came from canada first visit tejas meet' },
  { id: 'gate_sep22_12', srNo: 12, date: '22-Sep-26', visitorName: 'aamreen sing', dateOfBirth: '27/11/1963', mobileNo: '9567562903', address: 'Canada', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep22_13', srNo: 13, date: '22-Sep-26', visitorName: 'Prasad Kulkarni', dateOfBirth: '15/2/1972', mobileNo: '9567562903', address: 'Mangalwedha', remarks: 'Accompany Visitor', extraRemark: 'came with tom' },

  // 21-Sep-26
  { id: 'gate_sep21_1', srNo: 1, date: '21-Sep-26', visitorName: 'Dipali More', dateOfBirth: '27/1/1996', mobileNo: '9766929551', address: 'Shirbhavi', remarks: 'Accompany Visitor', extraRemark: 'came with lakxman more' },
  { id: 'gate_sep21_2', srNo: 2, date: '21-Sep-26', visitorName: 'Lakxman More', dateOfBirth: '27/4/1995', mobileNo: '8956816425', address: 'Shirbhavi', remarks: 'Donation', extraRemark: 'given meal donation' },
  { id: 'gate_sep21_3', srNo: 3, date: '21-Sep-26', visitorName: 'Naagnath Nagare', dateOfBirth: '21/9/1956', mobileNo: '9822512698', address: 'Vakhari', remarks: 'Visit', extraRemark: 'came to know about sahabhojan on 25th' },
  { id: 'gate_sep21_4', srNo: 4, date: '21-Sep-26', visitorName: 'Vishal Shinde', dateOfBirth: '6/10/2026', mobileNo: '7083710116', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'vaishnavi birthday sathi sahabhojan denyasathi aale hote' },
  { id: 'gate_sep21_5', srNo: 5, date: '21-Sep-26', visitorName: 'Vaishanavi Hiremath', dateOfBirth: '21/9/2000', mobileNo: '9035572022', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'came with Vishal Shinde' },
  { id: 'gate_sep21_6', srNo: 6, date: '21-Sep-26', visitorName: 'Chaitnya Bhosale', dateOfBirth: '23/10/2000', mobileNo: '9112113453', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep21_7', srNo: 7, date: '21-Sep-26', visitorName: 'Shivam Rajmane', dateOfBirth: '7/1/2000', mobileNo: '8888143136', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep21_8', srNo: 8, date: '21-Sep-26', visitorName: 'Shubham Bhais', dateOfBirth: '7/8/2000', mobileNo: '9960364200', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep21_9', srNo: 9, date: '21-Sep-26', visitorName: 'Shravani Solapure', dateOfBirth: '20/8/2005', mobileNo: '8446237654', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep21_10', srNo: 10, date: '21-Sep-26', visitorName: 'Sanjay Masake', dateOfBirth: '1/6/1970', mobileNo: '8999945417', address: 'Pandharpur', remarks: 'New Admission', extraRemark: 'kartik maske yanchya admission sathi aale hote' },
  { id: 'gate_sep21_11', srNo: 11, date: '21-Sep-26', visitorName: 'R D Masake', dateOfBirth: '19/4/1968', mobileNo: '8329981682', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep21_12', srNo: 12, date: '21-Sep-26', visitorName: 'Mr Dhotre', dateOfBirth: '12/11/1999', mobileNo: '7758801984', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'light metter basavnya sathi aale hote' },
  { id: 'gate_sep21_13', srNo: 13, date: '21-Sep-26', visitorName: 'Yug Kale', dateOfBirth: '19/9/2023', mobileNo: '8600889090', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep21_14', srNo: 14, date: '21-Sep-26', visitorName: 'Sanket Shegavkar', dateOfBirth: '18/4/1992', mobileNo: '9503457541', address: 'Pune', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep21_15', srNo: 15, date: '21-Sep-26', visitorName: 'Raj Taad', dateOfBirth: '20/9/2026', mobileNo: '8308551355', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'CCTV' },

  // 20-Sep-26
  { id: 'gate_sep20_1', srNo: 1, date: '20-Sep-26', visitorName: 'Shamsundar Tapadiya', dateOfBirth: '13/3/1964', mobileNo: '9423328998', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'first visit give old cloths' },
  { id: 'gate_sep20_2', srNo: 2, date: '20-Sep-26', visitorName: 'Rayana Tapadiya', dateOfBirth: '12/9/1972', mobileNo: '9422423388', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Donation' },
  { id: 'gate_sep20_3', srNo: 3, date: '20-Sep-26', visitorName: 'Shirish Salunkhe', dateOfBirth: '15/5/1973', mobileNo: '9422459844', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'given meal donation for shrenik salunkhe smrutiprityartha' },
  { id: 'gate_sep20_4', srNo: 4, date: '20-Sep-26', visitorName: 'Jyoti Salunkhe', dateOfBirth: '20/2/1984', mobileNo: '9422459844', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'came with Shirish Salunkhe' },
  { id: 'gate_sep20_5', srNo: 5, date: '20-Sep-26', visitorName: 'Shrenik Salunkhe', dateOfBirth: '3/2/2025', mobileNo: '9422459844', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep20_6', srNo: 6, date: '20-Sep-26', visitorName: 'Shritik Salunkhe', dateOfBirth: '3/2/2025', mobileNo: '9422459844', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep20_7', srNo: 7, date: '20-Sep-26', visitorName: 'Bharat Nichal', dateOfBirth: '19/1/1974', mobileNo: '9422459844', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep20_8', srNo: 8, date: '20-Sep-26', visitorName: 'Nichal', dateOfBirth: '23/5/1990', mobileNo: '9422459844', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep20_9', srNo: 9, date: '20-Sep-26', visitorName: 'Dipali More', dateOfBirth: '27/7/1996', mobileNo: '9766929551', address: 'Shirbhavi', remarks: 'Accompany Visitor', extraRemark: 'came with Laxman More' },
  { id: 'gate_sep20_10', srNo: 10, date: '20-Sep-26', visitorName: 'Laxman More', dateOfBirth: '27/4/1995', mobileNo: '8956816425', address: 'Shirbhavi', remarks: 'Donation', extraRemark: 'Goven meal donation' },
  { id: 'gate_sep20_11', srNo: 11, date: '20-Sep-26', visitorName: 'Aaditya More', dateOfBirth: '21/8/2017', mobileNo: '8956816425', address: 'Shirbhavi', remarks: 'Accompany Visitor', extraRemark: 'came with Laxman More' },
  { id: 'gate_sep20_12', srNo: 12, date: '20-Sep-26', visitorName: 'Punit Sarolkar', dateOfBirth: '10/8/1999', mobileNo: '9067891507', address: 'solapur', remarks: 'Visit', extraRemark: 'visit ref by tejas ghadge' },
  { id: 'gate_sep20_13', srNo: 13, date: '20-Sep-26', visitorName: 'Teja Sarolkar', dateOfBirth: '1/6/1974', mobileNo: '8605070260', address: 'solapur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep20_14', srNo: 14, date: '20-Sep-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Bhose', remarks: 'Maintenance', extraRemark: 'Laight cha kaam karnyasathi aale hote' },
  { id: 'gate_sep20_15', srNo: 15, date: '20-Sep-26', visitorName: 'Samadhan Davane', dateOfBirth: '13/1/2000', mobileNo: '7020164132', address: 'Bhose', remarks: 'Maintenance', extraRemark: 'Laight cha kaam karnyasathi aale hote' },
  { id: 'gate_sep20_16', srNo: 16, date: '20-Sep-26', visitorName: 'Radha Thombare', dateOfBirth: '8/4/1984', mobileNo: '7672473765', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Bhet aani donation dnyasathi aale hote' },
  { id: 'gate_sep20_17', srNo: 17, date: '20-Sep-26', visitorName: 'Riddhi Thombare', dateOfBirth: '2/4/2013', mobileNo: '7973473766', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'came with Radha Thombare' },
  { id: 'gate_sep20_18', srNo: 18, date: '20-Sep-26', visitorName: 'Siddhi Thombare', dateOfBirth: '2/4/2013', mobileNo: '7972473765', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'came with Radha Thombare' },
  { id: 'gate_sep20_19', srNo: 19, date: '20-Sep-26', visitorName: 'Vandana Pawar', dateOfBirth: '1/5/1983', mobileNo: '8698573052', address: 'Aambejogai', remarks: 'Accompany Visitor', extraRemark: 'came with Radha Thombare' },
  { id: 'gate_sep20_20', srNo: 20, date: '20-Sep-26', visitorName: 'Uramila Gatkule', dateOfBirth: '15/5/1983', mobileNo: '9284666438', address: 'Solapur', remarks: 'Visit', extraRemark: 'kapade denyasathi aale hote' },
  { id: 'gate_sep20_21', srNo: 21, date: '20-Sep-26', visitorName: 'Mangesh Salunkhe', dateOfBirth: '2/10/1996', mobileNo: '9970918105', address: 'Giravi', remarks: 'Visit', extraRemark: 'Meet to shital kaku' },
  { id: 'gate_sep20_22', srNo: 22, date: '20-Sep-26', visitorName: 'Sachin Pompale', dateOfBirth: '13/6/1993', mobileNo: '8530313191', address: 'Giravi', remarks: 'Donation', extraRemark: 'given donation dhanya denyasathi aale hote' },
  { id: 'gate_sep20_23', srNo: 23, date: '20-Sep-26', visitorName: 'Mahesh Salunkhe', dateOfBirth: '30/6/1992', mobileNo: '7709041575', address: 'Vakhari', remarks: 'Accompany Visitor', extraRemark: 'came with Sachin Pompale' },
  { id: 'gate_sep20_24', srNo: 24, date: '20-Sep-26', visitorName: 'Vinayak Pawar', dateOfBirth: '20/9/1999', mobileNo: '82088646464', address: 'Vakhari', remarks: 'Accompany Visitor', extraRemark: 'came with Sachin Pompale' },
  { id: 'gate_sep20_25', srNo: 25, date: '20-Sep-26', visitorName: 'Ganesh Bhurte', dateOfBirth: '27/10/2001', mobileNo: '7030216615', address: 'Vakhari', remarks: 'Accompany Visitor', extraRemark: 'came with Sachin Pompale' },

  // 19-Sep-26
  { id: 'gate_sep19_1', srNo: 1, date: '19-Sep-26', visitorName: 'Prashant Kale', dateOfBirth: '19/8/2003', mobileNo: '7499476013', address: 'Bittergaon', remarks: 'Visit', extraRemark: 'came to enquiry for dhol tasha program' },
  { id: 'gate_sep19_2', srNo: 2, date: '19-Sep-26', visitorName: 'Preamraj Mahanvare', dateOfBirth: '19/8/2003', mobileNo: '7499704590', address: 'Bittergaon', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep19_3', srNo: 3, date: '19-Sep-26', visitorName: 'Roshan Masake', dateOfBirth: '28/9/1999', mobileNo: '9309287653', address: 'Bittergaon', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep19_4', srNo: 4, date: '19-Sep-26', visitorName: 'Anand Londhe', dateOfBirth: '7/9/2000', mobileNo: '9665667455', address: 'Shevare', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep19_5', srNo: 5, date: '19-Sep-26', visitorName: 'Patil', dateOfBirth: '29/9/2006', mobileNo: '9561716392', address: 'Karkamb', remarks: 'Accompany Visitor', extraRemark: 'camer with Ganesh Dhobale' },
  { id: 'gate_sep19_6', srNo: 6, date: '19-Sep-26', visitorName: 'Vaibhav', dateOfBirth: '26/12/1998', mobileNo: '9130621100', address: 'Sapatne', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_7', srNo: 7, date: '19-Sep-26', visitorName: 'Sagar Thite', dateOfBirth: '18/5/1993', mobileNo: '9921614444', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_8', srNo: 8, date: '19-Sep-26', visitorName: 'Vitthal Mule', dateOfBirth: '10/6/1980', mobileNo: '9767988555', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_9', srNo: 9, date: '19-Sep-26', visitorName: 'Maruti Korake', dateOfBirth: '17/3/1979', mobileNo: '9763733333', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_10', srNo: 10, date: '19-Sep-26', visitorName: 'Jonraam Kangude', dateOfBirth: '1/6/1991', mobileNo: '976523728', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_11', srNo: 11, date: '19-Sep-26', visitorName: 'Sahaji Mule', dateOfBirth: '26/2/1997', mobileNo: '9860805566', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_12', srNo: 12, date: '19-Sep-26', visitorName: 'Tukaram Kangude', dateOfBirth: '13/10/1998', mobileNo: '9765373625', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_13', srNo: 13, date: '19-Sep-26', visitorName: 'Ganesh Dhobale', dateOfBirth: '19/9/1993', mobileNo: '9970939326', address: 'Umbare', remarks: 'Donation', extraRemark: 'given donation meal for birthday' },
  { id: 'gate_sep19_14', srNo: 14, date: '19-Sep-26', visitorName: 'Vitthal Kagude', dateOfBirth: '9/2/1990', mobileNo: '904909009', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'camer with Ganesh Dhobale' },
  { id: 'gate_sep19_15', srNo: 15, date: '19-Sep-26', visitorName: 'Nihal Pathan', dateOfBirth: '3/2/2011', mobileNo: '9511713928', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_16', srNo: 16, date: '19-Sep-26', visitorName: 'Mahesh Mule', dateOfBirth: '13/2/1997', mobileNo: '7767868871', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_17', srNo: 17, date: '19-Sep-26', visitorName: 'Amol Dhobale', dateOfBirth: '10/2/1994', mobileNo: '7519815555', address: 'Umbare', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_18', srNo: 18, date: '19-Sep-26', visitorName: 'Harshad Kamble', dateOfBirth: '1/6/1992', mobileNo: '9028183255', address: 'Baramati', remarks: 'Accompany Visitor', extraRemark: 'came with Akash Savalkar' },
  { id: 'gate_sep19_19', srNo: 19, date: '19-Sep-26', visitorName: 'Ravindra Suryawanshi', dateOfBirth: '1/1/1991', mobileNo: '8668814365', address: 'Baramati', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_20', srNo: 20, date: '19-Sep-26', visitorName: 'Swapnil Jadhav', dateOfBirth: '7/5/1991', mobileNo: '8796768376', address: 'Baramati', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_21', srNo: 21, date: '19-Sep-26', visitorName: 'Akash Savalkar', dateOfBirth: '10/12/1991', mobileNo: '7721881010', address: 'Baramati', remarks: 'Visit', extraRemark: 'visit to project ref bu tejas ghadge' },
  { id: 'gate_sep19_22', srNo: 22, date: '19-Sep-26', visitorName: 'Mandar Salunkhe', dateOfBirth: '11/6/1998', mobileNo: '9604050333', address: 'N/A', remarks: 'Donation', extraRemark: 'give donation for birthday' },
  { id: 'gate_sep19_23', srNo: 23, date: '19-Sep-26', visitorName: 'Aditya Mokashi', dateOfBirth: '15/6/2000', mobileNo: '9130322532', address: 'Shreepur', remarks: 'Accompany Visitor', extraRemark: 'came with mandar salunkhe' },
  { id: 'gate_sep19_24', srNo: 24, date: '19-Sep-26', visitorName: 'Vardhamaan', dateOfBirth: '2/7/2005', mobileNo: '9630092005', address: 'Shreepur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_25', srNo: 25, date: '19-Sep-26', visitorName: 'Vishwajeet', dateOfBirth: '5/10/1997', mobileNo: '9075704545', address: 'Shreepur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep19_26', srNo: 26, date: '19-Sep-26', visitorName: 'Suresh Popale', dateOfBirth: '08/09/1975', mobileNo: '9766170517', address: 'Begampur', remarks: 'Student Reletive', extraRemark: 'kartik mane' },
  { id: 'gate_sep19_27', srNo: 27, date: '19-Sep-26', visitorName: 'Dattatrya Popale', dateOfBirth: '1/1/1975', mobileNo: '9766170517', address: 'Begampur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep19_28', srNo: 28, date: '19-Sep-26', visitorName: 'Ashish Ubale', dateOfBirth: '27/9/2002', mobileNo: '9421062577', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'hiven dhanya and khau' },

  // 18-Sep-26
  { id: 'gate_sep18_1', srNo: 1, date: '18-Sep-26', visitorName: 'Suresh Kusumande', dateOfBirth: '1/6/1969', mobileNo: '9423779864', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'visit for sahabhojan' },
  { id: 'gate_sep18_2', srNo: 2, date: '18-Sep-26', visitorName: 'Uramila Kusumande', dateOfBirth: '12/9/1976', mobileNo: '8668268529', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep18_3', srNo: 3, date: '18-Sep-26', visitorName: 'Pandurang Badage', dateOfBirth: '1/6/1971', mobileNo: '9623794277', address: 'Aambe', remarks: 'Visit', extraRemark: 'he visit to us for marriage enquiry' },
  { id: 'gate_sep18_4', srNo: 4, date: '18-Sep-26', visitorName: 'Sankar More', dateOfBirth: '1/6/1970', mobileNo: '9552150662', address: 'Aambe', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep18_5', srNo: 5, date: '18-Sep-26', visitorName: 'Bashir Shaik', dateOfBirth: '1/6/1973', mobileNo: '9356568975', address: 'Aambe', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep18_6', srNo: 6, date: '18-Sep-26', visitorName: 'Kiran Shinde', dateOfBirth: '2/5/1994', mobileNo: '9096155118', address: 'Giravi', remarks: 'Visit', extraRemark: 'meet to deepa' },
  { id: 'gate_sep18_7', srNo: 7, date: '18-Sep-26', visitorName: 'Mangesh Salunkhe', dateOfBirth: '2/10/1996', mobileNo: '9970918105', address: 'Giravi', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep18_8', srNo: 8, date: '18-Sep-26', visitorName: 'Sandeep Garade', dateOfBirth: '27/7/1983', mobileNo: '9767256165', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'came with shivprasad gajare' },
  { id: 'gate_sep18_9', srNo: 9, date: '18-Sep-26', visitorName: 'Rudra Gajare', dateOfBirth: '20/1/2019', mobileNo: 'N/A', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep18_10', srNo: 10, date: '18-Sep-26', visitorName: 'Shivprasad Gajare', dateOfBirth: '18/9/2013', mobileNo: 'N/A', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'given donation for birthday in donation he given Khau' },
  { id: 'gate_sep18_11', srNo: 11, date: '18-Sep-26', visitorName: 'Ujwala Gajare', dateOfBirth: '27/6/1986', mobileNo: '9370694881', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'came with shivprasad gajare' },
  { id: 'gate_sep18_12', srNo: 12, date: '18-Sep-26', visitorName: 'Arun Gajare', dateOfBirth: '1/1/1960', mobileNo: '7020772685', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep18_13', srNo: 13, date: '18-Sep-26', visitorName: 'Urmila Game', dateOfBirth: '23/1/1986', mobileNo: '9850715272', address: 'Maalkhavi', remarks: 'Accompany Visitor', extraRemark: 'came with zunzarrao' },
  { id: 'gate_sep18_14', srNo: 14, date: '18-Sep-26', visitorName: 'Shobha Game', dateOfBirth: '1/6/1953', mobileNo: '9850715272', address: 'Maalkhavi', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep18_15', srNo: 15, date: '18-Sep-26', visitorName: 'Somnath Game', dateOfBirth: '13/5/1985', mobileNo: '9860715172', address: 'Maalkhavi', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep18_16', srNo: 16, date: '18-Sep-26', visitorName: 'yashwardhan game', dateOfBirth: '26/10/2008', mobileNo: '9860715172', address: 'Maalkhavi', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep18_17', srNo: 17, date: '18-Sep-26', visitorName: 'Zuzarrao Game', dateOfBirth: '1/6/1961', mobileNo: '9850715272', address: 'Maalkhavi', remarks: 'Donation', extraRemark: 'given donation and also give mithai' },

  // 17-Sep-26
  { id: 'gate_sep17_1', srNo: 1, date: '17-Sep-26', visitorName: 'Abhijit More', dateOfBirth: '1/1/1980', mobileNo: '95522352167', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Apana Ghar Opening' },
  { id: 'gate_sep17_2', srNo: 2, date: '17-Sep-26', visitorName: 'Navnath Shinde', dateOfBirth: '8/4/1987', mobileNo: '9689286305', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep17_3', srNo: 3, date: '17-Sep-26', visitorName: 'Samadhan Aavtade', dateOfBirth: 'N/A', mobileNo: 'N/A', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep17_4', srNo: 4, date: '17-Sep-26', visitorName: 'Parimal Ajalkar', dateOfBirth: '29/10/1987', mobileNo: '9404692955', address: 'Sangola', remarks: 'Donation', extraRemark: 'June Kapade denyasathi aale hote' },
  { id: 'gate_sep17_5', srNo: 5, date: '17-Sep-26', visitorName: 'Bajranga Borate', dateOfBirth: '8/12/1981', mobileNo: '9923798311', address: 'Akluj', remarks: 'Donation', extraRemark: 'Anna Dan aani bhet gaurav borate yanchya punyathithi nimitya' },
  { id: 'gate_sep17_6', srNo: 6, date: '17-Sep-26', visitorName: 'Reshma Borate', dateOfBirth: '16/9/1990', mobileNo: '9765756692', address: 'Akluj', remarks: 'Visit', extraRemark: 'Came with Bajranga Borate' },
  { id: 'gate_sep17_7', srNo: 7, date: '17-Sep-26', visitorName: 'Tanmay Borate', dateOfBirth: '10/6/2014', mobileNo: '9923798319', address: 'Akluj', remarks: 'Visit', extraRemark: 'Came with Bajranga Borate' },
  { id: 'gate_sep17_8', srNo: 8, date: '17-Sep-26', visitorName: 'Krishna Sakat', dateOfBirth: '26/12/1982', mobileNo: '9881681828', address: 'Solapur', remarks: 'Visit', extraRemark: 'First visit came from cottage hospital' },
  { id: 'gate_sep17_9', srNo: 9, date: '17-Sep-26', visitorName: 'Tukaram Waghmode', dateOfBirth: '17/11/1991', mobileNo: '9922511514', address: 'Korti', remarks: 'Visit', extraRemark: 'Devai Aaji yana Gheun janyasathi' },
  { id: 'gate_sep17_10', srNo: 10, date: '17-Sep-26', visitorName: 'Vijay Shinde', dateOfBirth: '13/12/1989', mobileNo: '8999968091', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep17_11', srNo: 11, date: '17-Sep-26', visitorName: 'Achitash Doshi', dateOfBirth: '5/1/1947', mobileNo: '1558357398', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep17_12', srNo: 12, date: '17-Sep-26', visitorName: 'Indrajit Paricharak', dateOfBirth: '26/5/1982', mobileNo: '7020050501', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },

  // 16-Sep-26
  { id: 'gate_sep16_1', srNo: 1, date: '16-Sep-26', visitorName: 'Ganesh Dhovale', dateOfBirth: '19/9/1993', mobileNo: '9970939326', address: 'Ubere', remarks: 'Donation', extraRemark: '19th sep la sahabhojan dile ahe taysathi mahiti ghenyasathi aale hote' },
  { id: 'gate_sep16_2', srNo: 2, date: '16-Sep-26', visitorName: 'Vitthal Kangude', dateOfBirth: '2/1/1990', mobileNo: '9049090009', address: 'Ubere', remarks: 'Accompany Visitor', extraRemark: 'came with ganesh Dhovale' },
  { id: 'gate_sep16_3', srNo: 3, date: '16-Sep-26', visitorName: 'Sheetal', dateOfBirth: '15/4/1987', mobileNo: '9049762999', address: 'Mohol', remarks: 'Visit', extraRemark: 'Aapna ghar jyoti hila ghari gheun janyasathi' },
  { id: 'gate_sep16_4', srNo: 4, date: '16-Sep-26', visitorName: 'Bhagyashri Deshmukha', dateOfBirth: '16/2/1989', mobileNo: '9767581673', address: 'Mahud', remarks: 'Donation', extraRemark: 'Atharva deshmukha yanchya kadun dhanya denyasathi aale' },
  { id: 'gate_sep16_5', srNo: 5, date: '16-Sep-26', visitorName: 'Siddheshwar Deshmukh', dateOfBirth: '24/1/1982', mobileNo: '9359226633', address: 'Mahud', remarks: 'Accompany Visitor', extraRemark: 'came with bhagyashri deshmukh' },
  { id: 'gate_sep16_6', srNo: 6, date: '16-Sep-26', visitorName: 'Nihar Deshmukh', dateOfBirth: '15/8/2017', mobileNo: '9359226633', address: 'Mahud', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_sep16_7', srNo: 7, date: '16-Sep-26', visitorName: 'Manju Koli', dateOfBirth: '14/9/1990', mobileNo: '9309192142', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Dhanyadenyasathi aale hote' },

  // 15-Sep-26
  { id: 'gate_sep15_1', srNo: 1, date: '15-Sep-26', visitorName: 'Lamb Vaishnavi', dateOfBirth: '18/10/2007', mobileNo: '7276172776', address: 'Kej', remarks: 'School/Collage Visit', extraRemark: 'Sveri Clg Student' },
  { id: 'gate_sep15_2', srNo: 2, date: '15-Sep-26', visitorName: 'Sattaya Gade', dateOfBirth: '24/4/2008', mobileNo: '9607796415', address: 'Ajnale', remarks: 'School/Collage Visit', extraRemark: 'School Visit' },
  { id: 'gate_sep15_3', srNo: 3, date: '15-Sep-26', visitorName: 'Archana Kadam', dateOfBirth: 'N/A', mobileNo: '99601992635', address: 'Pandharpur', remarks: 'School/Collage Visit', extraRemark: 'Techares from Sveri Clg' },
  { id: 'gate_sep15_4', srNo: 4, date: '15-Sep-26', visitorName: 'Dhananjay More', dateOfBirth: '30/5/1985', mobileNo: '9657591323', address: 'Dighanchi', remarks: 'Donation', extraRemark: 'Donation denyasathi aale hote' },
  { id: 'gate_sep15_5', srNo: 5, date: '15-Sep-26', visitorName: 'Pushkar Kusurkar', dateOfBirth: '15/9/1992', mobileNo: '7620331910', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'donation dile' },
  { id: 'gate_sep15_6', srNo: 6, date: '15-Sep-26', visitorName: 'R D Maske', dateOfBirth: '15/4/1968', mobileNo: '8329981682', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Cahokashi sathi aale hote' },

  // 14-Sep-26
  { id: 'gate_sep14_1', srNo: 1, date: '14-Sep-26', visitorName: 'Kalpana Dighe', dateOfBirth: '14/6/1994', mobileNo: '8999209528', address: 'Velapur', remarks: 'Donation', extraRemark: 'Saman dile Brush collgate etc' },
  { id: 'gate_sep14_2', srNo: 2, date: '14-Sep-26', visitorName: 'Dhiraj Tapkire', dateOfBirth: '14/9/1969', mobileNo: '8411970105', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Denagi denyasathi' },
  { id: 'gate_sep14_3', srNo: 3, date: '14-Sep-26', visitorName: 'Rahul Bagal', dateOfBirth: '26/5/1991', mobileNo: '9881765628', address: 'Gadegaon', remarks: 'Donation', extraRemark: 'Bhaji dile sahabhojan sathi' },

  // 13-Sep-26
  { id: 'gate_sep13_1', srNo: 1, date: '13-Sep-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Bhose', remarks: 'Maintenance', extraRemark: 'Maintenance work meet to aaba' },
  { id: 'gate_sep13_2', srNo: 2, date: '13-Sep-26', visitorName: 'Komal Kothari', dateOfBirth: '3/1/2007', mobileNo: '7020307675', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Clothes dile' },
  { id: 'gate_sep13_3', srNo: 3, date: '13-Sep-26', visitorName: 'Aditya Masake', dateOfBirth: '18/9/2007', mobileNo: '7414952070', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Clothes dile' },
  { id: 'gate_sep13_4', srNo: 4, date: '13-Sep-26', visitorName: 'Vinayak Sarvale', dateOfBirth: '6/2/1981', mobileNo: '9689284228', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Clothes dile' },
  { id: 'gate_sep13_5', srNo: 5, date: '13-Sep-26', visitorName: 'Suresh Kusmande', dateOfBirth: '1/6/1969', mobileNo: '9423779864', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Jevan aani clothes dile' },
  { id: 'gate_sep13_6', srNo: 6, date: '13-Sep-26', visitorName: 'Mahesh Kulkarni', dateOfBirth: '21/7/1975', mobileNo: '8888424943', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Palawi la Ganpati Denyasathi aale hote' },
  { id: 'gate_sep13_7', srNo: 7, date: '13-Sep-26', visitorName: 'Shilpa Kulkarni', dateOfBirth: '30/9/1983', mobileNo: '9075332166', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Mahesh Kulkarni' },

  // 12-Sep-26
  { id: 'gate_sep12_1', srNo: 1, date: '12-Sep-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Bhose', remarks: 'Maintenance', extraRemark: 'Maintenance work meet to aaba' },
  { id: 'gate_sep12_2', srNo: 2, date: '12-Sep-26', visitorName: 'Sangolakr Maaya', dateOfBirth: '30/6/1976', mobileNo: '9850686405', address: 'pandharpur', remarks: 'Visit', extraRemark: 'Teacher of aardarsh school came with 120 student to visit raghunath mashelkar science center' },
  { id: 'gate_sep12_3', srNo: 3, date: '12-Sep-26', visitorName: 'Sachin Kamble', dateOfBirth: '1/1/1988', mobileNo: '8600670985', address: 'Gardi', remarks: 'Visit', extraRemark: 'coming to give cow meadicen' },
  { id: 'gate_sep12_4', srNo: 4, date: '12-Sep-26', visitorName: 'Ajay More', dateOfBirth: '4/1/2001', mobileNo: '9049675798', address: 'pandharpur', remarks: 'Visit', extraRemark: 'Dudh Powder Denyasathi aale hote' },
  { id: 'gate_sep12_5', srNo: 5, date: '12-Sep-26', visitorName: 'Shree Tapase', dateOfBirth: '27/9/2007', mobileNo: '7372789995', address: 'mahud', remarks: 'Donation', extraRemark: 'Kapde denyasathi' },
  { id: 'gate_sep12_6', srNo: 6, date: '12-Sep-26', visitorName: 'Sanjay Evale', dateOfBirth: '23/8/1969', mobileNo: '9766303844', address: 'pandharpur', remarks: 'Visit', extraRemark: 'Bal gruha Adhikari Sanstha tapasnisathi aale hote meet to archana kavade' },

  // 11-Sep-26
  { id: 'gate_sep11_1', srNo: 1, date: '11-Sep-26', visitorName: 'Abhijit Sathe', dateOfBirth: '8/8/1999', mobileNo: '8483866531', address: 'Velapur', remarks: 'Visit', extraRemark: 'First time visit want to know about palawi' },
  { id: 'gate_sep11_2', srNo: 2, date: '11-Sep-26', visitorName: 'Mayur Devare', dateOfBirth: '2/5/1993', mobileNo: '9699924794', address: 'Velapur', remarks: 'Visit', extraRemark: 'First time visit want to know about palawi' },
  { id: 'gate_sep11_3', srNo: 3, date: '11-Sep-26', visitorName: 'Dr Preeti Shinde', dateOfBirth: '9/7/1970', mobileNo: '9420491103', address: 'Mangalvedha', remarks: 'Donation', extraRemark: 'President innerwill club came for good donation' },
  { id: 'gate_sep11_4', srNo: 4, date: '11-Sep-26', visitorName: 'Dnyanada Bodare', dateOfBirth: '9/9/1997', mobileNo: '9763674147', address: 'Gardi', remarks: 'Donation', extraRemark: 'Kirana Denyasathi aale hote' },
  { id: 'gate_sep11_5', srNo: 5, date: '11-Sep-26', visitorName: 'Laxman Vetal', dateOfBirth: 'N/A', mobileNo: '8830191535', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'chappal denyasathi aale hot' },

  // 10-Sep-26
  { id: 'gate_sep10_1', srNo: 1, date: '10-Sep-26', visitorName: 'Mauli Chandankar', dateOfBirth: 'N/A', mobileNo: '9975975055', address: 'Indapur', remarks: 'Student/staff Reletive', extraRemark: 'Sanjay Kale Yana bhetnaysathi' },
  { id: 'gate_sep10_2', srNo: 2, date: '10-Sep-26', visitorName: 'Dyaneshwar Rode', dateOfBirth: '10/6/1989', mobileNo: '8788616410', address: 'Pune', remarks: 'Visit', extraRemark: 'came to behalf of Vetoquinol Company for cruser puja' },
  { id: 'gate_sep10_3', srNo: 3, date: '10-Sep-26', visitorName: 'Shriram Kumthekar', dateOfBirth: '23/10/1950', mobileNo: '9822322404', address: 'Lonavla', remarks: 'Student Reletive', extraRemark: 'mansai la kayamswrupi ghari gheun janyasathi' },
  { id: 'gate_sep10_4', srNo: 4, date: '10-Sep-26', visitorName: 'Asif Tamboli', dateOfBirth: '12/12/1942', mobileNo: '7218997000', address: 'modnimb', remarks: 'Visit', extraRemark: 'came to behalf of Vetoquinol Company for cruser puja' },

  // 09-Sep-26
  { id: 'gate_sep09_1', srNo: 1, date: '09-Sep-26', visitorName: 'Vijay Thapa', dateOfBirth: '11/7/2006', mobileNo: '9041071603', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Radhesh Hotel Etheun aale hote vade talnyasathi' },
  { id: 'gate_sep09_2', srNo: 2, date: '09-Sep-26', visitorName: 'BAlveer', dateOfBirth: '11/9/2006', mobileNo: '7822070025', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Radhesh Hotel Etheun aale hote vade talnyasathi' },
  { id: 'gate_sep09_3', srNo: 3, date: '09-Sep-26', visitorName: 'Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Khadelose', remarks: 'Maintenance', extraRemark: 'light Work' },
  { id: 'gate_sep09_4', srNo: 4, date: '09-Sep-26', visitorName: 'Raiyyan Tamboli', dateOfBirth: '4/3/2006', mobileNo: '8669472605', address: 'Mahud', remarks: 'Donation', extraRemark: 'Sahabhojan dile ayyan yanchya birthday stahi' },
  { id: 'gate_sep09_5', srNo: 5, date: '09-Sep-26', visitorName: 'Shivraj Parait', dateOfBirth: '11/5/1991', mobileNo: '7721085177', address: 'Karkambh', remarks: 'Visit', extraRemark: 'Came to meet with vedant sir' },
  { id: 'gate_sep09_6', srNo: 6, date: '09-Sep-26', visitorName: 'Shravani Modi', dateOfBirth: '1/7/2003', mobileNo: '8208074005', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },

  // 08-Sep-26
  { id: 'gate_sep08_1', srNo: 1, date: '08-Sep-26', visitorName: 'Tukaram belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Khed Kole', remarks: 'Maintenance', extraRemark: 'Laight work' },
  { id: 'gate_sep08_2', srNo: 2, date: '08-Sep-26', visitorName: 'Dhanashree MAne', dateOfBirth: '9/5/1990', mobileNo: '9766987301', address: 'Begampur', remarks: 'Student Reletive', extraRemark: 'KArtik la bhetnaysathi aale' },
  { id: 'gate_sep08_3', srNo: 3, date: '08-Sep-26', visitorName: 'Bappu Hembade', dateOfBirth: '1/9/2006', mobileNo: '9922331528', address: 'Vakhari', remarks: 'School/Collage Visit', extraRemark: 'Payment ghenaysathi' },
  { id: 'gate_sep08_4', srNo: 4, date: '08-Sep-26', visitorName: 'Balu Padvale', dateOfBirth: '1/6/1981', mobileNo: '9423594903', address: 'Gopalpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_sep08_5', srNo: 5, date: '08-Sep-26', visitorName: 'Aaudumbar Lavate', dateOfBirth: '15/7/2006', mobileNo: '9325813959', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Bhaji denyasathi' },

  // 07-Sep-26
  { id: 'gate_sep07_1', srNo: 1, date: '07-Sep-26', visitorName: 'Jyoti Pawar', dateOfBirth: '7/9/1987', mobileNo: '9175041075', address: 'Pandharpur', remarks: 'Job/Internship', extraRemark: 'meet archana tai' },
  { id: 'gate_sep07_2', srNo: 2, date: '07-Sep-26', visitorName: 'Laxman Jadhav', dateOfBirth: '15/7/1998', mobileNo: '7709700569', address: 'Mohol', remarks: 'Visit', extraRemark: 'First visit sahabhojan dile jyoti jadhav yanchya birthdaysathi' },
  { id: 'gate_sep07_3', srNo: 3, date: '07-Sep-26', visitorName: 'Aryan', dateOfBirth: '12/9/2008', mobileNo: '9699088282', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Khau dila donation mhanun' },
  { id: 'gate_sep07_4', srNo: 4, date: '07-Sep-26', visitorName: 'Rohan Mule', dateOfBirth: '28/9/1997', mobileNo: '9730193157', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'fabrication work' },
  { id: 'gate_sep07_5', srNo: 5, date: '07-Sep-26', visitorName: 'Kalyanrao deshmukh', dateOfBirth: 'N/A', mobileNo: '9730590990', address: 'Kasegaon', remarks: 'Donation', extraRemark: 'Cash denagi dili' },
  { id: 'gate_sep07_6', srNo: 6, date: '07-Sep-26', visitorName: 'Mauli sarde', dateOfBirth: 'N/A', mobileNo: '7798358220', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Donation Peri koti dile' },

  // 06-Sep-26
  { id: 'gate_sep06_1', srNo: 1, date: '06-Sep-26', visitorName: 'Abhishek Sengupta', dateOfBirth: '28/9/1995', mobileNo: '7259980135', address: 'New Dehli', remarks: 'Visit', extraRemark: 'Feeding India Shutting' },
  { id: 'gate_sep06_2', srNo: 2, date: '06-Sep-26', visitorName: 'Arya Shama', dateOfBirth: '21/12/2000', mobileNo: '8920767940', address: 'Gurgaon', remarks: 'Visit', extraRemark: 'Feeding India Shutting' },
  { id: 'gate_sep06_3', srNo: 3, date: '06-Sep-26', visitorName: 'Padmaja Mahesh Kawade', dateOfBirth: '12/1/2005', mobileNo: '9922221452', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Bhetnya sathi' },
  { id: 'gate_sep06_4', srNo: 4, date: '06-Sep-26', visitorName: 'Piush Mahesh Davde', dateOfBirth: '6/3/1998', mobileNo: '7798969577', address: 'Nateputa', remarks: 'Donation', extraRemark: 'donation madhi kapde dela' },
  { id: 'gate_sep06_5', srNo: 5, date: '06-Sep-26', visitorName: 'Gaurav Sharma', dateOfBirth: '27/1/1986', mobileNo: '8585865683', address: 'Gurgaon', remarks: 'Visit', extraRemark: 'Feeding India Shutting' },
  { id: 'gate_sep06_6', srNo: 6, date: '06-Sep-26', visitorName: 'Harshada Kaulage', dateOfBirth: '24/1/1994', mobileNo: '9011303100', address: 'Pirachi Kuroli', remarks: 'Donation', extraRemark: 'Donation madhi sabhojan 2100 dela' },
  { id: 'gate_sep06_7', srNo: 7, date: '06-Sep-26', visitorName: 'Shobha Pore', dateOfBirth: '4/5/1964', mobileNo: '9423506042', address: 'Malshiras', remarks: 'Donation', extraRemark: 'Give PC and old cloths in donation' },
  { id: 'gate_sep06_8', srNo: 8, date: '06-Sep-26', visitorName: 'Vaishali Bidkar', dateOfBirth: '3/5/1981', mobileNo: '8766944461', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'old cloths donation first visit' },

  // 05-Sep-26
  { id: 'gate_sep05_1', srNo: 1, date: '05-Sep-26', visitorName: 'Gambhir Kalu Kole', dateOfBirth: '25/4/1992', mobileNo: 'N/A', address: 'Nashik', remarks: 'Donation', extraRemark: 'donation madhe rack dile' },
  { id: 'gate_sep05_2', srNo: 2, date: '05-Sep-26', visitorName: 'Dyneshwar Bhosale', dateOfBirth: 'N/A', mobileNo: '9923969198', address: 'Mohol', remarks: 'Visit', extraRemark: 'Mangal tai yana bhetnaysathi' },
  { id: 'gate_sep05_3', srNo: 3, date: '05-Sep-26', visitorName: 'Sudhakar Bhosale', dateOfBirth: '23/1/1997', mobileNo: '7030896737', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Blood sample ghenyasthi unique lab madhun aale' },
  { id: 'gate_sep05_4', srNo: 4, date: '05-Sep-26', visitorName: 'Dr Yashwant Kulakarni', dateOfBirth: '1/7/1972', mobileNo: '9923916100', address: 'Shreepur', remarks: 'Donation', extraRemark: 'Prashant Parichark Yanchay Birthday Sathi Sahabhojan dile' },
  { id: 'gate_sep05_5', srNo: 5, date: '05-Sep-26', visitorName: 'Abhijeet Shah', dateOfBirth: '4/1/1960', mobileNo: '8983067105', address: 'VAlchabd Nagar', remarks: 'Visit', extraRemark: 'Prajakta Shah Yana bhetnyasathi' },
  { id: 'gate_sep05_6', srNo: 6, date: '05-Sep-26', visitorName: 'Sanjay Pujari', dateOfBirth: '8/2/1944', mobileNo: '9226163260', address: 'Karad', remarks: 'Visit', extraRemark: 'One day stay in palawi meet mangal tai shah' },
  { id: 'gate_sep05_7', srNo: 7, date: '05-Sep-26', visitorName: 'Vinod Thatte', dateOfBirth: '14/8/1950', mobileNo: '9969671200', address: 'Pune', remarks: 'Visit', extraRemark: 'One day stay in palawi meet mangal tai shah' },
  { id: 'gate_sep05_8', srNo: 8, date: '05-Sep-26', visitorName: 'Anile Yashwant Parekar', dateOfBirth: '10/7/1972', mobileNo: '8888753059', address: 'Korti', remarks: 'Visit', extraRemark: 'Gopalkala nimetya bhet first visit' },
  { id: 'gate_sep05_9', srNo: 9, date: '05-Sep-26', visitorName: 'Abheshek Dipal Udale', dateOfBirth: '22/6/2000', mobileNo: '9370818678', address: 'Jainwadi', remarks: 'Donation', extraRemark: 'Dipal Udale yanchya birthday Nimitya tandul dela' },
  { id: 'gate_sep05_10', srNo: 10, date: '05-Sep-26', visitorName: 'Shubham Balbhim Wagh', dateOfBirth: '28/11/1997', mobileNo: '9011674774', address: 'Akluj', remarks: 'Donation', extraRemark: 'Balbhim Tukaram Wagh yanchya 5th punyatithi Nimitya navin kapde donate kela' },

  // 04-Sep-26
  { id: 'gate_sep04_1', srNo: 1, date: '04-Sep-26', visitorName: 'Pratiksha Sonawane', dateOfBirth: '26/3/1993', mobileNo: '9552166981', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Visit Donation cloth' },
  { id: 'gate_sep04_2', srNo: 2, date: '04-Sep-26', visitorName: 'Santosh Sadigale', dateOfBirth: 'N/A', mobileNo: '9028592323', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Prashant Paricharak Yanchya Birthday sathi Kapat dile' },
  { id: 'gate_sep04_3', srNo: 3, date: '04-Sep-26', visitorName: 'Harshad Bhosale', dateOfBirth: '2/6/1995', mobileNo: '9623687885', address: 'Akluj', remarks: 'Food Meal Donation', extraRemark: 'sahabhoja ganesh dhane yanchay birthday sathi' },
  { id: 'gate_sep04_4', srNo: 4, date: '04-Sep-26', visitorName: 'Anil Adate', dateOfBirth: '2/2/1965', mobileNo: '9421225044', address: 'Vita', remarks: 'Visit', extraRemark: 'Towel topi ani rajgira ladu dile' },
  { id: 'gate_sep04_5', srNo: 5, date: '04-Sep-26', visitorName: 'Shriram Dethe', dateOfBirth: '11/6/1998', mobileNo: '9970065980', address: 'Dhondewadi', remarks: 'Visit', extraRemark: 'shengdana chikki ladu etc dile dhondiram yanchya punasmarnartha' },

  // 03-Sep-26
  { id: 'gate_sep03_1', srNo: 1, date: '03-Sep-26', visitorName: 'Shreeram Kumthekar', dateOfBirth: '23/10/1950', mobileNo: '9822322404', address: 'Lonavala', remarks: 'Student Reletive', extraRemark: 'Came to meet with manasi' },
  { id: 'gate_sep03_2', srNo: 2, date: '03-Sep-26', visitorName: 'Shubhangi Kumthekar', dateOfBirth: '14/1/1960', mobileNo: '9822322404', address: 'Lonavala', remarks: 'Student Reletive', extraRemark: 'Relative' },
  { id: 'gate_sep03_3', srNo: 3, date: '03-Sep-26', visitorName: 'Mukta Aambedkar', dateOfBirth: '21/7/1999', mobileNo: '95030384440', address: 'Pandharpur', remarks: 'Job/Internship', extraRemark: 'Meet with Archana Didi' },
  { id: 'gate_sep03_4', srNo: 4, date: '03-Sep-26', visitorName: 'Dr. Suraj Gaikwad', dateOfBirth: '15/5/1993', mobileNo: '8087552465', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Give clothe inDonation' },
  { id: 'gate_sep03_5', srNo: 5, date: '03-Sep-26', visitorName: 'Shubham aggawane', dateOfBirth: '16/2/1997', mobileNo: '9623778584', address: 'Kharadi', remarks: 'Donation', extraRemark: 'Pandhapur Sabhatati suresh aagavne yanchya samrnarth sahitya vatap Recept creant on surekha aagavne name' },
  { id: 'gate_sep03_6', srNo: 6, date: '03-Sep-26', visitorName: 'Khushi Chavan', dateOfBirth: '10/11/2006', mobileNo: '8788670223', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Girish kadam yanchya birthday sathi dhanya watap' },

  // 02-Sep-26
  { id: 'gate_sep02_1', srNo: 1, date: '02-Sep-26', visitorName: 'Sunil Ambedkar', dateOfBirth: '1/6/1970', mobileNo: '8459381610', address: 'Latur', remarks: 'Visit', extraRemark: 'Self visit see the project' },
  { id: 'gate_sep02_2', srNo: 2, date: '02-Sep-26', visitorName: 'Jagdhish Navandar', dateOfBirth: '26/10/1979', mobileNo: '9422203996', address: 'Sambhajinagar', remarks: 'Visit', extraRemark: 'Self visit see the project' },
  { id: 'gate_sep02_3', srNo: 3, date: '02-Sep-26', visitorName: 'Manik Patareke', dateOfBirth: '21/6/1984', mobileNo: '9130037044', address: 'Akluj', remarks: 'Donation', extraRemark: 'Donation denaysathi aale hote Ghasarkundi dili' },

  // 01-Sep-26
  { id: 'gate_sep01_1', srNo: 1, date: '01-Sep-26', visitorName: 'D.S Bodake', dateOfBirth: '8/5/1953', mobileNo: '9325349322', address: 'Kolhapur', remarks: 'Accompany Visitor', extraRemark: 'Came with Babasaheb Patil' },
  { id: 'gate_sep01_2', srNo: 2, date: '01-Sep-26', visitorName: 'Balasaheb Patil', dateOfBirth: '21/8/1948', mobileNo: '9822432121', address: 'Kolhapur', remarks: 'Visit', extraRemark: 'Self visit came with friends' },
  { id: 'gate_sep01_3', srNo: 3, date: '01-Sep-26', visitorName: 'Ashwini Padwal', dateOfBirth: '28/1/1992', mobileNo: '9325468424', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Came to meet with vaibhav sir' },
  { id: 'gate_sep01_4', srNo: 4, date: '01-Sep-26', visitorName: 'Puja Maske', dateOfBirth: '20/4/1993', mobileNo: 'N/A', address: 'Modnimb', remarks: 'New Palawi Admission', extraRemark: 'New admission' },
  { id: 'gate_sep01_5', srNo: 5, date: '01-Sep-26', visitorName: 'Om Chavan', dateOfBirth: '1/9/2004', mobileNo: '9421070237', address: 'Karkamb', remarks: 'Visit', extraRemark: 'First Visit given Cash Donation' },

  // --- AUGUST 2026 (Descending: 31-Aug down to 01-Aug) ---
  // 31-Aug-26
  { id: 'gate_aug31_1', srNo: 1, date: '31-Aug-26', visitorName: 'Durga Thite', dateOfBirth: '19/11/2008', mobileNo: '9689659377', address: 'Pandharpur', remarks: 'School/Collage Visit', extraRemark: 'came form sweri Clg for RakshaBandhan Celebration' },
  { id: 'gate_aug31_2', srNo: 2, date: '31-Aug-26', visitorName: 'Shreya Wagh', dateOfBirth: '10/2/2009', mobileNo: '9921577555', address: 'Nandore', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_3', srNo: 3, date: '31-Aug-26', visitorName: 'Samrudhi Bhosale', dateOfBirth: '28/9/2009', mobileNo: '8080142256', address: 'Sarkoli', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_4', srNo: 4, date: '31-Aug-26', visitorName: 'Aarti Shignare', dateOfBirth: '30/3/2009', mobileNo: '8788591173', address: 'Mangalvedha', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_5', srNo: 5, date: '31-Aug-26', visitorName: 'Akshata Kulkarni', dateOfBirth: '30/3/2009', mobileNo: '9850803937', address: 'Pandharpur', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_6', srNo: 6, date: '31-Aug-26', visitorName: 'Vaishanavi Kemdane', dateOfBirth: '8/10/2008', mobileNo: '9860471107', address: 'Kurudwadi', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_7', srNo: 7, date: '31-Aug-26', visitorName: 'Shital Lokate', dateOfBirth: '3/4/2009', mobileNo: '8600841494', address: 'Ujjani', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_8', srNo: 8, date: '31-Aug-26', visitorName: 'Samiksha Khandagale', dateOfBirth: '15/4/2009', mobileNo: '9970385863', address: 'Ajnale', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_9', srNo: 9, date: '31-Aug-26', visitorName: 'Shivai Jadhav', dateOfBirth: '4/3/2009', mobileNo: '9834557532', address: 'Patful', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_10', srNo: 10, date: '31-Aug-26', visitorName: 'Samrudhhi Dethe', dateOfBirth: '11/11/2009', mobileNo: '9373079668', address: 'Pune', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_11', srNo: 11, date: '31-Aug-26', visitorName: 'Sharavni Shinde', dateOfBirth: '1/12/2008', mobileNo: '8010269713', address: 'Aran', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_12', srNo: 12, date: '31-Aug-26', visitorName: 'Yashaswi Salgare', dateOfBirth: '30/11/2008', mobileNo: '9684015959', address: 'Pandharpur', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_13', srNo: 13, date: '31-Aug-26', visitorName: 'Sayali Sangde', dateOfBirth: '12/12/2008', mobileNo: '9405042525', address: 'Paranda', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_14', srNo: 14, date: '31-Aug-26', visitorName: 'Sakshi Javlekar', dateOfBirth: '8/4/2010', mobileNo: '8530463238', address: 'Mangalvedha', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_15', srNo: 15, date: '31-Aug-26', visitorName: 'Prachi Mohite', dateOfBirth: '14/5/2009', mobileNo: '9356980579', address: 'Pandharpur', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_16', srNo: 16, date: '31-Aug-26', visitorName: 'Gayatri Kulkarni', dateOfBirth: '24/12/2008', mobileNo: '8261924959', address: 'Bondale', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_17', srNo: 17, date: '31-Aug-26', visitorName: 'Rajnandini Nanavare', dateOfBirth: '23/3/2009', mobileNo: '8888139168', address: 'Goudgaon', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_18', srNo: 18, date: '31-Aug-26', visitorName: 'Srushti Jankar', dateOfBirth: '12/12/2008', mobileNo: '9970766175', address: 'shirala', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_19', srNo: 19, date: '31-Aug-26', visitorName: 'Aakansha Bhosale', dateOfBirth: '23/12/2008', mobileNo: '9130440424', address: 'Kalamwadi', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_20', srNo: 20, date: '31-Aug-26', visitorName: 'Priyanka Raut', dateOfBirth: '1/6/2009', mobileNo: '9921172612', address: 'Manegaon', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_21', srNo: 21, date: '31-Aug-26', visitorName: 'Vaishanavi Chavan', dateOfBirth: '19/10/2009', mobileNo: '9552194807', address: 'Suste', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_22', srNo: 22, date: '31-Aug-26', visitorName: 'Rutuja Raut', dateOfBirth: '29/9/2009', mobileNo: '9529346770', address: 'Mohol', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_23', srNo: 23, date: '31-Aug-26', visitorName: 'Sakshi dupade', dateOfBirth: '27/8/2008', mobileNo: '7709674145', address: 'Kolegaon', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_24', srNo: 24, date: '31-Aug-26', visitorName: 'Pratiksha Shinde', dateOfBirth: '21/2/2009', mobileNo: '9561204441', address: 'Aambe', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_25', srNo: 25, date: '31-Aug-26', visitorName: 'Asmita Surwase', dateOfBirth: '15/5/2009', mobileNo: '9011194299', address: 'Vagdari', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_26', srNo: 26, date: '31-Aug-26', visitorName: 'Sanchita Surve', dateOfBirth: '21/10/2008', mobileNo: '9373622003', address: 'Modnimba', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_27', srNo: 27, date: '31-Aug-26', visitorName: 'Siddhi Shinde', dateOfBirth: '14/7/2009', mobileNo: '9665608876', address: 'Aran', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_28', srNo: 28, date: '31-Aug-26', visitorName: 'Siddhi Shinde', dateOfBirth: '28/5/2009', mobileNo: '8177907753', address: 'Aran', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_29', srNo: 29, date: '31-Aug-26', visitorName: 'Vidya Panchal', dateOfBirth: '23/9/2009', mobileNo: '9545216667', address: 'Nipani', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_30', srNo: 30, date: '31-Aug-26', visitorName: 'Sayali Mamhane', dateOfBirth: '7/8/2009', mobileNo: '9766381959', address: 'Puluj', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_31', srNo: 31, date: '31-Aug-26', visitorName: 'Samiksha More', dateOfBirth: '20/10/2009', mobileNo: '9011449880', address: 'Mundhewadi', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_32', srNo: 32, date: '31-Aug-26', visitorName: 'Priya Lokare', dateOfBirth: '23/3/2009', mobileNo: '7499853296', address: 'Ujjani', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_33', srNo: 33, date: '31-Aug-26', visitorName: 'Renuka Shinde', dateOfBirth: '18/10/2007', mobileNo: '7218970369', address: 'Pandharpur', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_34', srNo: 34, date: '31-Aug-26', visitorName: 'Tanuja Hajgude', dateOfBirth: '12/11/2009', mobileNo: '9529929114', address: 'Dharashiv', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_35', srNo: 35, date: '31-Aug-26', visitorName: 'Saloni Patil', dateOfBirth: '10/6/2008', mobileNo: '9922620684', address: 'jalkotwadi', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_36', srNo: 36, date: '31-Aug-26', visitorName: 'Mukta Bhore', dateOfBirth: '14/8/2009', mobileNo: '8262057707', address: 'Paranda', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_37', srNo: 37, date: '31-Aug-26', visitorName: 'Geetanjali Bhosale', dateOfBirth: '29/6/2009', mobileNo: '9370980279', address: 'shignapur', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_38', srNo: 38, date: '31-Aug-26', visitorName: 'Runali Jadhav', dateOfBirth: '19/10/2009', mobileNo: '9923346821', address: 'Ujjani', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_39', srNo: 39, date: '31-Aug-26', visitorName: 'Sayali Gavali', dateOfBirth: '14/11/2009', mobileNo: '9730702198', address: 'solapur', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_40', srNo: 40, date: '31-Aug-26', visitorName: 'Nikita Hukkeri', dateOfBirth: '7/4/2009', mobileNo: '985018150', address: 'solapur', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },
  { id: 'gate_aug31_41', srNo: 41, date: '31-Aug-26', visitorName: 'Suhani Jadhav', dateOfBirth: '8/8/2009', mobileNo: '9637952774', address: 'Marvade', remarks: 'School/Collage Visit', extraRemark: 'RakshaBandhan Celebration' },

  // 30-Aug-26
  { id: 'gate_aug30_1', srNo: 1, date: '30-Aug-26', visitorName: 'Dhanaji Aayare', dateOfBirth: '10/11/1985', mobileNo: '9970732005', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Madhurala Sodanyakarita' },
  { id: 'gate_aug30_2', srNo: 2, date: '30-Aug-26', visitorName: 'K.S. Pukale', dateOfBirth: '24/5/1993', mobileNo: '7776070913', address: 'Begampur', remarks: 'School/Collage Visit', extraRemark: 'Rakshabandhan Celebratation Visit No.1' },
  { id: 'gate_aug30_3', srNo: 3, date: '30-Aug-26', visitorName: 'Sakshi Karape', dateOfBirth: '28/11/2006', mobileNo: '7620877277', address: 'Sveris', remarks: 'School/Collage Visit', extraRemark: 'Rakshabandhan Celebration' },
  { id: 'gate_aug30_4', srNo: 4, date: '30-Aug-26', visitorName: 'Sudhakar Bhosale', dateOfBirth: '23/1/1997', mobileNo: '7030896737', address: 'Pandharpur', remarks: 'School/Collage Visit', extraRemark: 'School Visit' },
  { id: 'gate_aug30_5', srNo: 5, date: '30-Aug-26', visitorName: 'Trikay Mane', dateOfBirth: '28/8/2025', mobileNo: '8329846842', address: 'Pandharpur', remarks: 'Birthday Celebration', extraRemark: 'Trikay Yanchya Vadhadivasanimitta Fal Vatap Karanysathi Visit No.2' },
  { id: 'gate_aug30_6', srNo: 6, date: '30-Aug-26', visitorName: 'Jitesh Gandhi', dateOfBirth: '6/1/1992', mobileNo: '8888049257', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Raddi Pepera Denyakarita' },

  // 29-Aug-26
  { id: 'gate_aug29_1', srNo: 1, date: '29-Aug-26', visitorName: 'Shahid Shekh', dateOfBirth: '26/4/2002', mobileNo: '9822525152', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Motor Repair' },
  { id: 'gate_aug29_2', srNo: 2, date: '29-Aug-26', visitorName: 'Sachin Madhukar Sonawane', dateOfBirth: '29/8/2026', mobileNo: '9730937879', address: 'Kasegaon', remarks: 'Birthday Celebration', extraRemark: 'Birthday Celebration Visit' },
  { id: 'gate_aug29_3', srNo: 3, date: '29-Aug-26', visitorName: 'Prafull Vishnu Aandhalkar', dateOfBirth: '29/8/2026', mobileNo: '9527000018', address: 'Akluj', remarks: 'Birthday Celebration', extraRemark: 'Birthday Celebration' },
  { id: 'gate_aug29_4', srNo: 4, date: '29-Aug-26', visitorName: 'Dhiraj Gajare', dateOfBirth: '25/9/2001', mobileNo: '7038339419', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Fire System Rescue' },

  // 28-Aug-26
  { id: 'gate_aug28_1', srNo: 1, date: '28-Aug-26', visitorName: 'Maruti Sarade', dateOfBirth: '1/2/1961', mobileNo: '7798558220', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Second Visit' },
  { id: 'gate_aug28_2', srNo: 2, date: '28-Aug-26', visitorName: 'Omkar Khandare', dateOfBirth: '3/9/1998', mobileNo: '8265060476', address: 'Natepute', remarks: 'Visit', extraRemark: 'Priyanka Tai La Bhetanyasathi' },
  { id: 'gate_aug28_3', srNo: 3, date: '28-Aug-26', visitorName: 'Vinit Doshi', dateOfBirth: '14/12/1978', mobileNo: '9890171288', address: 'Faltan', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug28_4', srNo: 4, date: '28-Aug-26', visitorName: 'Sudhir Vaidya', dateOfBirth: '5/6/1961', mobileNo: '9657120234', address: 'Akluj', remarks: 'Donation', extraRemark: 'Cloths' },

  // 27-Aug-26
  { id: 'gate_aug27_1', srNo: 1, date: '27-Aug-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964172', address: 'Khed Bhose', remarks: 'Maintenance', extraRemark: 'Visit' },
  { id: 'gate_aug27_2', srNo: 2, date: '27-Aug-26', visitorName: 'Shital Gupta', dateOfBirth: '15/4/1987', mobileNo: '9049762999', address: 'Pandharpur', remarks: 'New Palawi Admission', extraRemark: 'Jyoti Aanantakar Yanchya admission Karita Aale hote' },
  { id: 'gate_aug27_3', srNo: 3, date: '27-Aug-26', visitorName: 'Sameer Upane', dateOfBirth: '6/2/1987', mobileNo: '8275303578', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_aug27_4', srNo: 4, date: '27-Aug-26', visitorName: 'Mahesh Patange', dateOfBirth: '20/11/1988', mobileNo: '9226334045', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Neo smile Company LED Tv Fitting' },
  { id: 'gate_aug27_5', srNo: 5, date: '27-Aug-26', visitorName: 'Shivaji Dattu Lawate', dateOfBirth: '1/1/1980', mobileNo: '9552915218', address: 'Vathar', remarks: 'Donation', extraRemark: 'Medicine' },

  // 26-Aug-26
  { id: 'gate_aug26_1', srNo: 1, date: '26-Aug-26', visitorName: 'Santosh Shivaji Nawale', dateOfBirth: '1/6/1979', mobileNo: '9822861625', address: 'Aadhiv', remarks: 'Maintenance', extraRemark: 'Machine Repair' },
  { id: 'gate_aug26_2', srNo: 2, date: '26-Aug-26', visitorName: 'Sushama Ingale', dateOfBirth: '2/10/1970', mobileNo: '9422011490', address: 'Daund', remarks: 'Visit', extraRemark: 'Second Visit' },
  { id: 'gate_aug26_3', srNo: 3, date: '26-Aug-26', visitorName: 'Shriram Kamathekar', dateOfBirth: '23/10/1950', mobileNo: '9822322404', address: 'Lonawala', remarks: 'New Palawi Admission', extraRemark: 'New Admission Fourth Visit' },

  // 25-Aug-26
  { id: 'gate_aug25_1', srNo: 1, date: '25-Aug-26', visitorName: 'Shreya Patange', dateOfBirth: '23/11/2006', mobileNo: '9545630222', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug25_2', srNo: 2, date: '25-Aug-26', visitorName: 'Aamil Mardan', dateOfBirth: '1/6/1991', mobileNo: '8766860121', address: 'Kasegaon', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug25_3', srNo: 3, date: '25-Aug-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Khed Bhose', remarks: 'Maintenance', extraRemark: 'Electricity Work' },

  // 24-Aug-26
  { id: 'gate_aug24_1', srNo: 1, date: '24-Aug-26', visitorName: 'Surendrasingh Pardeshi', dateOfBirth: '15/11/1998', mobileNo: '9975885000', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths Surendra Singh Yanchyasobat Aale' },
  { id: 'gate_aug24_2', srNo: 2, date: '24-Aug-26', visitorName: 'Siddhappa Takale', dateOfBirth: '1/1/1960', mobileNo: '7875748771', address: 'Gundewadi', remarks: 'Donation', extraRemark: 'Kirana Denyasathi' },
  { id: 'gate_aug24_3', srNo: 3, date: '24-Aug-26', visitorName: 'Swapnali Ingale', dateOfBirth: '24/8/1989', mobileNo: '9890886364', address: 'Mangalwedha', remarks: 'Birthday Celebration', extraRemark: 'Donate Cupboard' },
  { id: 'gate_aug24_4', srNo: 4, date: '24-Aug-26', visitorName: 'Dr. Shaman Marda', dateOfBirth: 'N/A', mobileNo: '9422583878', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },

  // 23-Aug-26
  { id: 'gate_aug23_1', srNo: 1, date: '23-Aug-26', visitorName: 'Prasad Kumbharkar', dateOfBirth: '27/8/2002', mobileNo: '9307550514', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_aug23_2', srNo: 2, date: '23-Aug-26', visitorName: 'Dhiraj Gajare', dateOfBirth: '25/9/2001', mobileNo: '7038339419', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Fire Extinguisher' },
  { id: 'gate_aug23_3', srNo: 3, date: '23-Aug-26', visitorName: 'Pooja Lavangkar', dateOfBirth: '23/8/2026', mobileNo: '7775887837', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Biskits' },

  // 22-Aug-26
  { id: 'gate_aug22_1', srNo: 1, date: '22-Aug-26', visitorName: 'Amol Balasaheb Pandhare', dateOfBirth: '28/6/1986', mobileNo: '9766472635', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Fernicher' },
  { id: 'gate_aug22_2', srNo: 2, date: '22-Aug-26', visitorName: 'Shubham Mahamuni', dateOfBirth: '12/11/2000', mobileNo: '7972071669', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'WaterFilter' },
  { id: 'gate_aug22_3', srNo: 3, date: '22-Aug-26', visitorName: 'Vidhi Nagane', dateOfBirth: '1/3/2021', mobileNo: '8830182978', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Sahitya' },
  { id: 'gate_aug22_4', srNo: 4, date: '22-Aug-26', visitorName: 'Mahesh Kore', dateOfBirth: '23/7/1982', mobileNo: '9403354595', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Old Cloths' },

  // 21-Aug-26
  { id: 'gate_aug21_1', srNo: 1, date: '21-Aug-26', visitorName: 'Tukaram Deshmukh', dateOfBirth: '13/3/1978', mobileNo: '9881667251', address: 'Indapur', remarks: 'New Palawi Admission', extraRemark: 'Sanjay Kale Yanchya Admission Karita aale hote' },
  { id: 'gate_aug21_2', srNo: 2, date: '21-Aug-26', visitorName: 'Om Pawar', dateOfBirth: '15/3/2003', mobileNo: '9607107980', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Filterche Kam' },
  { id: 'gate_aug21_3', srNo: 3, date: '21-Aug-26', visitorName: 'Deshmukh Rohit', dateOfBirth: '26/1/2003', mobileNo: '9921963621', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Tank Wash' },

  // 20-Aug-26
  { id: 'gate_aug20_1', srNo: 1, date: '20-Aug-26', visitorName: 'Umesh Hake', dateOfBirth: '29/6/2025', mobileNo: '8308661228', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Food Meal' },
  { id: 'gate_aug20_2', srNo: 2, date: '20-Aug-26', visitorName: 'Balajisingh Pardeshi', dateOfBirth: '30/12/1986', mobileNo: '9921715600', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug20_3', srNo: 3, date: '20-Aug-26', visitorName: 'Aanand Sharma', dateOfBirth: '5/1/1998', mobileNo: '7425929711', address: 'Baglmukhi', remarks: 'Visit', extraRemark: 'Visit' },

  // 19-Aug-26
  { id: 'gate_aug19_1', srNo: 1, date: '19-Aug-26', visitorName: 'Sumit Surendra Pise', dateOfBirth: '19/8/1992', mobileNo: '9890522259', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Dhanya Denyakarita' },
  { id: 'gate_aug19_2', srNo: 2, date: '19-Aug-26', visitorName: 'Ashwini Podawale', dateOfBirth: '28/2/1992', mobileNo: '9325468424', address: 'Pandharpur', remarks: 'visit', extraRemark: 'First Visit' },
  { id: 'gate_aug19_3', srNo: 3, date: '19-Aug-26', visitorName: 'Prajakta Kulkarni', dateOfBirth: '11/12/1995', mobileNo: '9270283185', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Archana Tai la bhetanyasathi' },
  { id: 'gate_aug19_4', srNo: 4, date: '19-Aug-26', visitorName: 'Saniya Gandhi', dateOfBirth: '31/5/2005', mobileNo: '9309419938', address: 'Modnimb', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_aug19_5', srNo: 5, date: '19-Aug-26', visitorName: 'Uddhav Bagal', dateOfBirth: '19/8/1955', mobileNo: '9822032082', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Biskit ,Chiwada Pocket, Uddhav Bagal Yanchya Birthday Nimitta' },

  // 18-Aug-26
  { id: 'gate_aug18_1', srNo: 1, date: '18-Aug-26', visitorName: 'Chandanshive S.S.', dateOfBirth: '13/8/1989', mobileNo: '9881114707', address: 'Bohali', remarks: 'Donation', extraRemark: 'First Visit Donate banana' },
  { id: 'gate_aug18_2', srNo: 2, date: '18-Aug-26', visitorName: 'Tukaram Vaghmode', dateOfBirth: '17/11/1991', mobileNo: '9922512514', address: 'Korti', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug18_3', srNo: 3, date: '18-Aug-26', visitorName: 'Gaurav Sartape', dateOfBirth: '6/12/1991', mobileNo: '9607192483', address: 'Pandhapur', remarks: 'Donation', extraRemark: 'Cloths And Biskit' },
  { id: 'gate_aug18_4', srNo: 4, date: '18-Aug-26', visitorName: 'Charan Jadhav', dateOfBirth: '9/7/1995', mobileNo: '8459802026', address: 'Bohali', remarks: 'Donation', extraRemark: 'First Visit Donate Biskit' },
  { id: 'gate_aug18_5', srNo: 5, date: '18-Aug-26', visitorName: 'Datta Gosavi', dateOfBirth: '12/11/2002', mobileNo: '8329396188', address: 'Pandhapur', remarks: 'Maintenance', extraRemark: 'Fabrication' },

  // 17-Aug-26
  { id: 'gate_aug17_1', srNo: 1, date: '17-Aug-26', visitorName: 'Suryakant Jadhav', dateOfBirth: '1/6/1966', mobileNo: '9890862134', address: 'Mangalwedha', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug17_2', srNo: 2, date: '17-Aug-26', visitorName: 'Sudhamati Londhe', dateOfBirth: '18/5/1969', mobileNo: '9765484733', address: 'Modnimb', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_aug17_3', srNo: 3, date: '17-Aug-26', visitorName: 'Akash D Mane', dateOfBirth: '12/5/2001', mobileNo: '9930163606', address: 'By Pass', remarks: 'Donation', extraRemark: 'Bhajipala Dene' },
  { id: 'gate_aug17_4', srNo: 4, date: '17-Aug-26', visitorName: 'Makrand Lokate', dateOfBirth: '17/8/1982', mobileNo: '9423587987', address: 'Pandharpur', remarks: 'Birthday Celebration', extraRemark: 'Birthday Celebratation' },

  // 16-Aug-26
  { id: 'gate_aug16_1', srNo: 1, date: '16-Aug-26', visitorName: 'Monika Vijay Patil', dateOfBirth: '26/1/2005', mobileNo: '8237430307', address: 'Korochi', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug16_2', srNo: 2, date: '16-Aug-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Khed - Bhose', remarks: 'Maintenance', extraRemark: 'Light Work' },
  { id: 'gate_aug16_3', srNo: 3, date: '16-Aug-26', visitorName: 'Pampatvar Govind', dateOfBirth: '4/5/1989', mobileNo: '9921101495', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Old Cloths' },
  { id: 'gate_aug16_4', srNo: 4, date: '16-Aug-26', visitorName: 'Shivshankar Virape', dateOfBirth: '18/2/1993', mobileNo: '9421959675', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Tandul Aani June Kapade' },
  { id: 'gate_aug16_5', srNo: 5, date: '16-Aug-26', visitorName: 'Sunita Vithal Fugare', dateOfBirth: '10/8/1975', mobileNo: '9421594532', address: 'Mangalwedha', remarks: 'Donation', extraRemark: 'Food Grain' },

  // 15-Aug-26
  { id: 'gate_aug15_1', srNo: 1, date: '15-Aug-26', visitorName: 'Pandurang Damale', dateOfBirth: '1/1/1973', mobileNo: '7823827189', address: 'Pandharpur', remarks: 'New Palawi Admission', extraRemark: 'Gangamai Aajiche Admission Karita aale hote' },
  { id: 'gate_aug15_2', srNo: 2, date: '15-Aug-26', visitorName: 'Ritesh Bhalake', dateOfBirth: '26/8/2003', mobileNo: '8668237612', address: 'Pandharpur', remarks: 'Food Meal Donation', extraRemark: 'Food Donation' },
  { id: 'gate_aug15_3', srNo: 3, date: '15-Aug-26', visitorName: 'Sachin Nagane', dateOfBirth: '2/10/1980', mobileNo: '9890168916', address: 'Mangalwedha', remarks: 'Birthday Celebration', extraRemark: 'First Visit Shrushti Nagane Birthday Celebratation' },
  { id: 'gate_aug15_4', srNo: 4, date: '15-Aug-26', visitorName: 'Dattatrey Chalekar', dateOfBirth: '15/8/2005', mobileNo: '9923938227', address: 'Bagalwadi', remarks: 'Donation', extraRemark: 'Tandul' },
  { id: 'gate_aug15_5', srNo: 5, date: '15-Aug-26', visitorName: 'Vikas Bandpatte', dateOfBirth: '15/8/2000', mobileNo: '7558589369', address: 'Bagalwadi', remarks: 'Donation', extraRemark: 'Keli' },

  // 14-Aug-26
  { id: 'gate_aug14_1', srNo: 1, date: '14-Aug-26', visitorName: 'Abhijit Rajguru', dateOfBirth: '19/8/1984', mobileNo: '9890635581', address: 'Mahud', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_aug14_2', srNo: 2, date: '14-Aug-26', visitorName: 'Mayur Raut', dateOfBirth: '10/5/1998', mobileNo: '8806106194', address: 'Tulajapur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug14_3', srNo: 3, date: '14-Aug-26', visitorName: 'Somanath Godase', dateOfBirth: '12/11/1988', mobileNo: '9527051519', address: 'Sangola', remarks: 'Visit', extraRemark: 'Visit' },

  // 13-Aug-26
  { id: 'gate_aug13_1', srNo: 1, date: '13-Aug-26', visitorName: 'Rupesh Aaradhye', dateOfBirth: '4/8/1967', mobileNo: '7722008434', address: 'Pandharpur', remarks: 'Payment/Check Receive', extraRemark: 'Payment/Check Receive' },
  { id: 'gate_aug13_2', srNo: 2, date: '13-Aug-26', visitorName: 'Usha Gambhir', dateOfBirth: '9/10/1986', mobileNo: '7756967233', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug13_3', srNo: 3, date: '13-Aug-26', visitorName: 'Prajakta Kulkarni', dateOfBirth: '11/12/1995', mobileNo: '9270283185', address: 'Pandharpur', remarks: 'Job/Internship', extraRemark: 'Job Sandharbh Archana Didila Bhetanyasathi' },
  { id: 'gate_aug13_4', srNo: 4, date: '13-Aug-26', visitorName: 'Raghunath Patil', dateOfBirth: '1/6/1973', mobileNo: '9373007064', address: 'Kolhapur', remarks: 'New Palawi Admission', extraRemark: 'New Admission' },

  // 12-Aug-26
  { id: 'gate_aug12_1', srNo: 1, date: '12-Aug-26', visitorName: 'Santosh Shivaji Nawale', dateOfBirth: '1/6/1979', mobileNo: '9822861625', address: 'Aadhiv', remarks: 'Maintenance', extraRemark: 'SRP Shilai Machine Work' },
  { id: 'gate_aug12_2', srNo: 2, date: '12-Aug-26', visitorName: 'Shraddha Chandrakant More', dateOfBirth: '9/9/2023', mobileNo: '8080395293', address: 'Pandharpur', remarks: 'Job/Internship', extraRemark: 'Watchaman Sakalache' },
  { id: 'gate_aug12_3', srNo: 3, date: '12-Aug-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Khedbhose', remarks: 'Maintenance', extraRemark: 'Light Work' },
  { id: 'gate_aug12_4', srNo: 4, date: '12-Aug-26', visitorName: 'Reshma Sozak', dateOfBirth: '21/9/1988', mobileNo: '9930041752', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_aug12_5', srNo: 5, date: '12-Aug-26', visitorName: 'Makarand Kumbhare', dateOfBirth: '8/2/1993', mobileNo: '9860323555', address: 'Mangalwedha', remarks: 'Donation', extraRemark: 'Diaper' },

  // 11-Aug-26
  { id: 'gate_aug11_1', srNo: 1, date: '11-Aug-26', visitorName: 'Atharv Pathak', dateOfBirth: '2/11/2002', mobileNo: '8624831948', address: 'Ichalkaranji', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug11_2', srNo: 2, date: '11-Aug-26', visitorName: 'Shriram Vyankat Belage', dateOfBirth: '1/1/2000', mobileNo: '8459848613', address: 'Shriran', remarks: 'New Palawi Admission', extraRemark: 'New Admission' },
  { id: 'gate_aug11_3', srNo: 3, date: '11-Aug-26', visitorName: 'Suddhey Parwat', dateOfBirth: '10/5/2000', mobileNo: '8975717512', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },

  // 10-Aug-26
  { id: 'gate_aug10_1', srNo: 1, date: '10-Aug-26', visitorName: 'Sharada Bapat', dateOfBirth: '17/9/1966', mobileNo: '9921009370', address: 'Ankali', remarks: 'Visit', extraRemark: 'First Visit' },
  { id: 'gate_aug10_2', srNo: 2, date: '10-Aug-26', visitorName: 'Pratiksha Bhise', dateOfBirth: '18/7/2003', mobileNo: '8354051451', address: 'Malawali', remarks: 'Food Meal Donation', extraRemark: 'Rahul Bhise Yanchya Smarnarth Rohit Bhise yanchyakadun sahabhojan Karita Aale hote' },
  { id: 'gate_aug10_3', srNo: 3, date: '10-Aug-26', visitorName: 'Gayatri Shirsat', dateOfBirth: '10/10/1999', mobileNo: '9028835281', address: 'Akluj', remarks: 'Visit', extraRemark: 'donation Denyakarita' },
  { id: 'gate_aug10_4', srNo: 4, date: '10-Aug-26', visitorName: 'Shankar Jagatap', dateOfBirth: '1/6/1960', mobileNo: '9767008070', address: 'Solapur', remarks: 'Donation', extraRemark: 'Old Cloths' },
  { id: 'gate_aug10_5', srNo: 5, date: '10-Aug-26', visitorName: 'Dipak Patil', dateOfBirth: '5/9/1970', mobileNo: '9850013700', address: 'Kharsoli', remarks: 'Birthday Celebration', extraRemark: 'Shraddha Patil Yanchya Birthday Nimitta Khau Vatap' },

  // 09-Aug-26
  { id: 'gate_aug09_1', srNo: 1, date: '09-Aug-26', visitorName: 'Gajanan Mali', dateOfBirth: '16/9/1958', mobileNo: '9403682936', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug09_2', srNo: 2, date: '09-Aug-26', visitorName: 'Wagh Dyaneshwar', dateOfBirth: '8/11/1983', mobileNo: 'N/A', address: 'Kopargaon', remarks: 'New Palawi Admission', extraRemark: 'Admission' },
  { id: 'gate_aug09_3', srNo: 3, date: '09-Aug-26', visitorName: 'Jayashri Doke', dateOfBirth: '24/7/1971', mobileNo: '9422847469', address: 'Lakshmi Takali', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_aug09_4', srNo: 4, date: '09-Aug-26', visitorName: 'Seema Kadam', dateOfBirth: '1/10/1988', mobileNo: '8766729698', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Banana And Biskit' },

  // 08-Aug-26
  { id: 'gate_aug08_1', srNo: 1, date: '08-Aug-26', visitorName: 'Tanishka Kambale', dateOfBirth: '18/8/2011', mobileNo: '9503850396', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Old Cloths' },
  { id: 'gate_aug08_2', srNo: 2, date: '08-Aug-26', visitorName: 'Kalpana Gaikwad', dateOfBirth: '8/7/1974', mobileNo: '9860893134', address: 'Akluj', remarks: 'Visit', extraRemark: 'First Visit' },
  { id: 'gate_aug08_3', srNo: 3, date: '08-Aug-26', visitorName: 'Dr. Dilip Kale', dateOfBirth: '12/11/1960', mobileNo: '9423424512', address: 'Amaravati', remarks: 'Visit', extraRemark: 'Visit' },

  // 07-Aug-26
  { id: 'gate_aug07_1', srNo: 1, date: '07-Aug-26', visitorName: 'Bankar Abhishek', dateOfBirth: '14/8/2002', mobileNo: '8983449652', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'B.Ed Shaley Path Niyojan' },
  { id: 'gate_aug07_2', srNo: 2, date: '07-Aug-26', visitorName: 'Rina Rupnavar', dateOfBirth: '29/3/1999', mobileNo: '9834302511', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_aug07_3', srNo: 3, date: '07-Aug-26', visitorName: 'Savita Dudhabhane', dateOfBirth: '1/6/1980', mobileNo: '9834103363', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Shaikshanik Vidnyan Prayog Bhet' },

  // 06-Aug-26
  { id: 'gate_aug06_1', srNo: 1, date: '06-Aug-26', visitorName: 'Amar Mane', dateOfBirth: '3/6/1989', mobileNo: '7558451006', address: 'Ishwar Wathar', remarks: 'Visit', extraRemark: 'Jayashri Apanaghar Bhetanyakarita' },
  { id: 'gate_aug06_2', srNo: 2, date: '06-Aug-26', visitorName: 'Piyush Goyal', dateOfBirth: '26/6/2004', mobileNo: '9607731639', address: 'Pandharpur', remarks: 'Job/Internship', extraRemark: 'Swachata Karanyasathi Lagale Tar Sangane Bathroom Swachatesathi Kam Vicharane' },
  { id: 'gate_aug06_3', srNo: 3, date: '06-Aug-26', visitorName: 'Santosh Magar', dateOfBirth: '6/6/1979', mobileNo: '9850279568', address: 'Pune', remarks: 'Donation', extraRemark: 'Anna Dhanya denyasathi' },

  // 05-Aug-26
  { id: 'gate_aug05_1', srNo: 1, date: '05-Aug-26', visitorName: 'Kalidas Shinde', dateOfBirth: '2/3/1962', mobileNo: '9822194793', address: 'Isabavi', remarks: 'Payment/Check Receive', extraRemark: 'Payment/Check Receive' },
  { id: 'gate_aug05_2', srNo: 2, date: '05-Aug-26', visitorName: 'Surekha Dattatrey Popale', dateOfBirth: '8/8/1998', mobileNo: '9766710517', address: 'Begampur', remarks: 'Children Meet', extraRemark: 'Kartik Mane Meet' },

  // 04-Aug-26
  { id: 'gate_aug04_1', srNo: 1, date: '04-Aug-26', visitorName: 'Anamika Kumbhar', dateOfBirth: '26/6/1975', mobileNo: '9823058607', address: 'Chikmahud', remarks: 'Donation', extraRemark: 'Old Cloths' },
  { id: 'gate_aug04_2', srNo: 2, date: '04-Aug-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Khed Bhose', remarks: 'Maintenance', extraRemark: 'Light Work' },
  { id: 'gate_aug04_3', srNo: 3, date: '04-Aug-26', visitorName: 'Sachin Doshi', dateOfBirth: '6/3/1978', mobileNo: '9850864351', address: 'Akluj', remarks: 'Donation', extraRemark: 'Food Grain' },
  { id: 'gate_aug04_4', srNo: 4, date: '04-Aug-26', visitorName: 'Avinash Gaikwad', dateOfBirth: '10/4/1999', mobileNo: '8788208851', address: 'Pandharpur', remarks: 'Food Meal Donation', extraRemark: 'Kai. Rahul Bhise Yanchya Smarnath Sahabhojan Denyababt Bolanyas aale hote' },
  { id: 'gate_aug04_5', srNo: 5, date: '04-Aug-26', visitorName: 'Saurabh Shinde', dateOfBirth: '28/8/1999', mobileNo: '9172315004', address: 'Velapur', remarks: 'Donation', extraRemark: 'First Visit Tejashri Shinde Yanchya Birthday Nimitta Fruit Donate' },
  { id: 'gate_aug04_6', srNo: 6, date: '04-Aug-26', visitorName: 'Divya Tarapurkar', dateOfBirth: '22/7/1996', mobileNo: '8412863052', address: 'Pandharpur', remarks: 'Children Meet', extraRemark: 'To Give Birthday Wish To samarth' },
  { id: 'gate_aug04_7', srNo: 7, date: '04-Aug-26', visitorName: 'Swami Shrikantnandji Maharaj', dateOfBirth: '16/7/1955', mobileNo: '7767015807', address: 'Pune', remarks: 'Visit', extraRemark: 'From Ramkrishna Math First Visit Meet Bai' },
  { id: 'gate_aug04_8', srNo: 8, date: '04-Aug-26', visitorName: 'Vijaya Satpute', dateOfBirth: '15/11/1950', mobileNo: '9850157585', address: 'Pune', remarks: 'Visit', extraRemark: 'First Visit Donate Cloths' },

  // 03-Aug-26
  { id: 'gate_aug03_1', srNo: 1, date: '03-Aug-26', visitorName: 'Payal More', dateOfBirth: '9/9/2009', mobileNo: '9518556837', address: 'Pandharpur', remarks: 'Job/Internship', extraRemark: 'Security Trenning' },
  { id: 'gate_aug03_2', srNo: 2, date: '03-Aug-26', visitorName: 'Ravi Suravase', dateOfBirth: '19/1/1996', mobileNo: '9960538162', address: 'Bohari', remarks: 'Visit', extraRemark: 'First Visit For Information' },
  { id: 'gate_aug03_3', srNo: 3, date: '03-Aug-26', visitorName: 'Amtama Vadda', dateOfBirth: '15/7/2008', mobileNo: '7028401578', address: 'Kolhapur', remarks: 'New Palawi Admission', extraRemark: 'Amruta Vadda Yachya Admission Sathgi Aale Hote' },

  // 02-Aug-26
  { id: 'gate_aug02_1', srNo: 1, date: '02-Aug-26', visitorName: 'Kishori Ambure', dateOfBirth: '13/12/1989', mobileNo: '9325857522', address: 'Pandharpur', remarks: 'Job/Internship', extraRemark: 'Security' },
  { id: 'gate_aug02_2', srNo: 2, date: '02-Aug-26', visitorName: 'Pravin Punekar', dateOfBirth: '2/8/2026', mobileNo: '9890160213', address: 'Pandharpur', remarks: 'Donation', extraRemark: '3 Bag cloths' },
  { id: 'gate_aug02_3', srNo: 3, date: '02-Aug-26', visitorName: 'Vipul Madane', dateOfBirth: '26/4/2000', mobileNo: '9011172956', address: 'Lingiware', remarks: 'Birthday Celebration', extraRemark: 'Mahesh Madane ( Nagar Abhiyanta Sangali) Saheb Yanchya Birthday Nimitta Sahity Vatap Karanyababat' },
  { id: 'gate_aug02_4', srNo: 4, date: '02-Aug-26', visitorName: 'Usha Bayas', dateOfBirth: '30/8/1993', mobileNo: '7020713539', address: 'Chiwari', remarks: 'New Palawi Admission', extraRemark: 'First Visit Admission Karita Aale Hote' },
  { id: 'gate_aug02_5', srNo: 5, date: '02-Aug-26', visitorName: 'Ashwini Shrikrushna', dateOfBirth: '18/5/1985', mobileNo: '9731815305', address: 'Banglore', remarks: 'Donation', extraRemark: 'First Visit Sahitya Denyakarita' },
  { id: 'gate_aug02_6', srNo: 6, date: '02-Aug-26', visitorName: 'Monali Pawar', dateOfBirth: '1/3/1993', mobileNo: '9665764201', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths And Toys' },
  { id: 'gate_aug02_7', srNo: 7, date: '02-Aug-26', visitorName: 'Harshal Inamdar', dateOfBirth: '2/3/2026', mobileNo: '9822804234', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Old Cloths' },
  { id: 'gate_aug02_8', srNo: 8, date: '02-Aug-26', visitorName: 'Shantaram Gajare', dateOfBirth: '2/8/1970', mobileNo: '9763652632', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Apple And Banana' },

  // 01-Aug-26
  { id: 'gate_aug01_1', srNo: 1, date: '01-Aug-26', visitorName: 'Julekha Khalib', dateOfBirth: '8/2/1989', mobileNo: '7709254848', address: 'Pandharpur', remarks: 'Job/Internship', extraRemark: 'Watchman Work' },
  { id: 'gate_aug01_2', srNo: 2, date: '01-Aug-26', visitorName: 'Sharad Ghadage', dateOfBirth: '14/9/1987', mobileNo: '9766585782', address: 'Pandharpur', remarks: 'Birthday Celebration', extraRemark: 'Abhijeet Aaba Patil yanchya vadhadivasanimitta sharad ghadage yanchya kadun sahabhojan regular yetat' },
  { id: 'gate_aug01_3', srNo: 3, date: '01-Aug-26', visitorName: 'Dr. Poonam More', dateOfBirth: '13/10/1982', mobileNo: '7821917883', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_aug01_4', srNo: 4, date: '01-Aug-26', visitorName: 'Shreyash Lokhande', dateOfBirth: '1/8/2026', mobileNo: '9172726105', address: 'Pandharpur', remarks: 'Birthday Celebration', extraRemark: 'Jayavant Kawade Yanchya Birthday Nimitta Dhanya Dene' },

  // --- JULY 2026 (Descending: 31-Jul down to 01-Jul) ---
  // 31-Jul-26
  { id: 'gate_jul31_1', srNo: 1, date: '31-Jul-26', visitorName: 'Vrushabh Shirish Hora', dateOfBirth: '29/8/1996', mobileNo: '9403346445', address: 'Satara', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_jul31_2', srNo: 2, date: '31-Jul-26', visitorName: 'Sai Vibhute', dateOfBirth: '6/3/2008', mobileNo: '9011742986', address: 'Shripur', remarks: 'Visit', extraRemark: 'MSW' },
  { id: 'gate_jul31_3', srNo: 3, date: '31-Jul-26', visitorName: 'Tukaram Belkar', dateOfBirth: '8/3/1995', mobileNo: '7620964132', address: 'Khed Bhose', remarks: 'Maintenance', extraRemark: 'Light Work' },
  { id: 'gate_jul31_4', srNo: 4, date: '31-Jul-26', visitorName: 'Vaishnavi Shahane', dateOfBirth: '19/2/2002', mobileNo: '8856967767', address: 'Pandharpur', remarks: 'Field Work', extraRemark: 'Field Work' },
  { id: 'gate_jul31_5', srNo: 5, date: '31-Jul-26', visitorName: 'Vaishanavi Chavhan', dateOfBirth: '25/3/2002', mobileNo: '7498436703', address: 'Pandharpur', remarks: 'Field Work', extraRemark: 'Field Work' },

  // 30-Jul-26
  { id: 'gate_jul30_1', srNo: 1, date: '30-Jul-26', visitorName: 'Amol Khulape', dateOfBirth: '2/11/1990', mobileNo: '9987378271', address: 'Korti', remarks: 'Visit', extraRemark: 'Singhgad School Letter Denyasathi' },
  { id: 'gate_jul30_2', srNo: 2, date: '30-Jul-26', visitorName: 'Manisha Jadhav', dateOfBirth: '2/6/1988', mobileNo: '9175800906', address: 'Mahud', remarks: 'Birthday Celebration', extraRemark: 'Vadhadivasanimitta Dhanya V khau Denyakarita' },
  { id: 'gate_jul30_3', srNo: 3, date: '30-Jul-26', visitorName: 'Jyoti Jadhav', dateOfBirth: '8/6/1996', mobileNo: '9175800906', address: 'Mahud', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul30_4', srNo: 4, date: '30-Jul-26', visitorName: 'Shalan Pawar', dateOfBirth: '8/6/1996', mobileNo: '9175800906', address: 'Mahud', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul30_5', srNo: 5, date: '30-Jul-26', visitorName: 'Divya Pawar', dateOfBirth: '7/1/2001', mobileNo: '9011417084', address: 'Mahud', remarks: 'Birthday Celebration', extraRemark: 'Shivtej Birthday Nimitta Dhnya V khau Denyakarita' },
  { id: 'gate_jul30_6', srNo: 6, date: '30-Jul-26', visitorName: 'Navanath Pawar', dateOfBirth: '21/10/1990', mobileNo: '9011417084', address: 'Mahud', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul30_7', srNo: 7, date: '30-Jul-26', visitorName: 'Raju Pawar', dateOfBirth: '26/6/1993', mobileNo: '8446140932', address: 'Mahud', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul30_8', srNo: 8, date: '30-Jul-26', visitorName: 'Birudev Lawate', dateOfBirth: '2/2/2002', mobileNo: '937120052', address: 'Mahud', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul30_9', srNo: 9, date: '30-Jul-26', visitorName: 'Muktai Pawar', dateOfBirth: '16/6/2004', mobileNo: '8390288172', address: 'Pandharpur', remarks: 'school/Collage Visit', extraRemark: 'Sweri Collage Mulanchi Activity Ghenyakarita Aale Hote' },
  { id: 'gate_jul30_10', srNo: 10, date: '30-Jul-26', visitorName: 'Gauri Waghamare', dateOfBirth: '20/9/2004', mobileNo: '7972901330', address: 'Barshi', remarks: 'school/Collage Visit', extraRemark: 'Visitor' },
  { id: 'gate_jul30_11', srNo: 11, date: '30-Jul-26', visitorName: 'Rubi Yadav', dateOfBirth: '1/10/2004', mobileNo: '9065453371', address: 'Pandharpur', remarks: 'school/Collage Visit', extraRemark: 'Visitor' },
  { id: 'gate_jul30_12', srNo: 12, date: '30-Jul-26', visitorName: 'Kajal Chorkar', dateOfBirth: '18/12/2000', mobileNo: '9579759433', address: 'Waki Shivane', remarks: 'school/Collage Visit', extraRemark: 'Visitor' },
  { id: 'gate_jul30_13', srNo: 13, date: '30-Jul-26', visitorName: 'Digvijay Parade', dateOfBirth: '29/10/2003', mobileNo: '7744927628', address: 'Barshi', remarks: 'school/Collage Visit', extraRemark: 'Visitor' },
  { id: 'gate_jul30_14', srNo: 14, date: '30-Jul-26', visitorName: 'Digvijay Dhatinge', dateOfBirth: '9/12/2003', mobileNo: '9579734238', address: 'Sangola', remarks: 'school/Collage Visit', extraRemark: 'Visitor' },
  { id: 'gate_jul30_15', srNo: 15, date: '30-Jul-26', visitorName: 'Shruti Bote', dateOfBirth: '6/8/2004', mobileNo: '9226393929', address: 'Barshi', remarks: 'school/Collage Visit', extraRemark: 'Visitor' },
  { id: 'gate_jul30_16', srNo: 16, date: '30-Jul-26', visitorName: 'Saish Vibhute', dateOfBirth: '6/3/2008', mobileNo: '9011172956', address: 'Shripur', remarks: 'Job/Internship', extraRemark: 'LPV community development 30 Hrs intership disscussion Tejas' },
  { id: 'gate_jul30_17', srNo: 17, date: '30-Jul-26', visitorName: 'Vaishnavi Shahane', dateOfBirth: '19/2/2002', mobileNo: '8856967767', address: 'Pandharpur', remarks: 'Field Work', extraRemark: 'Field Work' },
  { id: 'gate_jul30_18', srNo: 18, date: '30-Jul-26', visitorName: 'Vaishnavi Chavhan', dateOfBirth: '25/3/2002', mobileNo: '7498436705', address: 'Pandharpur', remarks: 'Field Work', extraRemark: 'Field Work' },
  { id: 'gate_jul30_19', srNo: 19, date: '30-Jul-26', visitorName: 'Sagar Gaikwad', dateOfBirth: '26/7/1989', mobileNo: '9975454200', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visitor' },
  { id: 'gate_jul30_20', srNo: 20, date: '30-Jul-26', visitorName: 'Prashant Ravan', dateOfBirth: 'N/A', mobileNo: '9423037026', address: 'Dighanchi', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_jul30_21', srNo: 21, date: '30-Jul-26', visitorName: 'Sandeep Shinde', dateOfBirth: '22/4/1981', mobileNo: '9921626313', address: 'Dighanchi', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },

  // 29-Jul-26
  { id: 'gate_jul29_1', srNo: 1, date: '29-Jul-26', visitorName: 'Umesh Hake', dateOfBirth: '29/6/2001', mobileNo: '8308661228', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Plumbing Work' },
  { id: 'gate_jul29_2', srNo: 2, date: '29-Jul-26', visitorName: 'Naganath Raut', dateOfBirth: 'N/A', mobileNo: '9325689919', address: 'Kurduwadi', remarks: 'Visit', extraRemark: 'Dattak Mul Ghenyababat Vicharpus Karanyasathi' },
  { id: 'gate_jul29_3', srNo: 3, date: '29-Jul-26', visitorName: 'Pooja Raut', dateOfBirth: 'N/A', mobileNo: 'N/A', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul29_4', srNo: 4, date: '29-Jul-26', visitorName: 'Ganesh Nayik', dateOfBirth: 'N/A', mobileNo: '7499429602', address: 'Karmala', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul29_5', srNo: 5, date: '29-Jul-26', visitorName: 'Pooja Nayik', dateOfBirth: 'N/A', mobileNo: 'N/A', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul29_6', srNo: 6, date: '29-Jul-26', visitorName: 'Vaishnavi Chavhan', dateOfBirth: '25/3/2002', mobileNo: '7498430705', address: 'Pandharpur', remarks: 'Field Work', extraRemark: 'Field Work' },
  { id: 'gate_jul29_7', srNo: 7, date: '29-Jul-26', visitorName: 'Vaishnavi Shahane', dateOfBirth: '19/2/2002', mobileNo: '8856967767', address: 'Pandharpur', remarks: 'Field Work', extraRemark: 'Field Work' },
  { id: 'gate_jul29_8', srNo: 8, date: '29-Jul-26', visitorName: 'Dole Radhika', dateOfBirth: '3/12/2002', mobileNo: '8080495991', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Khau denyakarita sandarbh Mohini kulkarni' },
  { id: 'gate_jul29_9', srNo: 9, date: '29-Jul-26', visitorName: 'Vedpathak Manish', dateOfBirth: '29/7/2001', mobileNo: '9766507542', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul29_10', srNo: 10, date: '29-Jul-26', visitorName: 'Shrinath Kadam', dateOfBirth: '29/7/2025', mobileNo: '9665278500', address: 'Gadegaon', remarks: 'Donation', extraRemark: 'cloths' },

  // 28-Jul-26
  { id: 'gate_jul28_1', srNo: 1, date: '28-Jul-26', visitorName: 'Nanda Bhosale', dateOfBirth: '1/6/1972', mobileNo: '9960070880', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Old Cloths' },
  { id: 'gate_jul28_2', srNo: 2, date: '28-Jul-26', visitorName: 'Rupali Dipak Shinde', dateOfBirth: 'N/A', mobileNo: 'N/A', address: 'Dharmgaon', remarks: 'New Palawi Admission', extraRemark: 'Admission' },
  { id: 'gate_jul28_3', srNo: 3, date: '28-Jul-26', visitorName: 'Vaishnavi Mahesh Shahane', dateOfBirth: '19/2/2002', mobileNo: '8856967767', address: 'Pandharpur', remarks: 'Field Work', extraRemark: 'Field Work' },
  { id: 'gate_jul28_4', srNo: 4, date: '28-Jul-26', visitorName: 'Vaishnavi Arvind Chavhan', dateOfBirth: '25/3/2002', mobileNo: '7498436705', address: 'Pandharpur', remarks: 'Field Work', extraRemark: 'Field Work' },
  { id: 'gate_jul28_5', srNo: 5, date: '28-Jul-26', visitorName: 'Shahaji Govind Kambale', dateOfBirth: 'N/A', mobileNo: '8530399897', address: 'Takali', remarks: 'Donation', extraRemark: 'Jwari' },
  { id: 'gate_jul28_6', srNo: 6, date: '28-Jul-26', visitorName: 'Abhishek Alankar', dateOfBirth: '5/5/2001', mobileNo: '7385076160', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Sahitya dene' },
  { id: 'gate_jul28_7', srNo: 7, date: '28-Jul-26', visitorName: 'Asmita Pawar', dateOfBirth: '29/7/2024', mobileNo: '9922729414', address: 'Chincholi', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },

  // 27-Jul-26
  { id: 'gate_jul27_1', srNo: 1, date: '27-Jul-26', visitorName: 'PSI Khadake Patil', dateOfBirth: '17/4/1996', mobileNo: '9503709217', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Nirbhaya Pathak darvarshi Varila Yetat Garajeche Sahitya Aanale aahe' },
  { id: 'gate_jul27_2', srNo: 2, date: '27-Jul-26', visitorName: 'PC kuchekar', dateOfBirth: '22/9/1991', mobileNo: '9588409416', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul27_3', srNo: 3, date: '27-Jul-26', visitorName: 'PC Pandurang Tingare', dateOfBirth: '10/11/1997', mobileNo: '9370012880', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jul27_4', srNo: 4, date: '27-Jul-26', visitorName: 'Suman Dilip Pawar', dateOfBirth: '14/9/1900', mobileNo: '7972314008', address: 'Takali', remarks: 'Donation', extraRemark: 'Old Cloths 3 bags' },
  { id: 'gate_jul27_5', srNo: 5, date: '27-Jul-26', visitorName: 'Dhananjay Sukhadev Patole', dateOfBirth: '27/7/1992', mobileNo: '7821870567', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Fruits' },
  { id: 'gate_jul27_6', srNo: 6, date: '27-Jul-26', visitorName: 'Swati Dhananjay Patole', dateOfBirth: '10/3/1995', mobileNo: '7875988741', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },

  // --- JUNE 2026 (Descending: 30-Jun down to 01-Jun) ---
  { id: 'gate_jun30_1', srNo: 1, date: '30-Jun-26', visitorName: 'Shital Munde', dateOfBirth: '24/12/1998', mobileNo: '9029102176', address: 'Isabavi', remarks: 'Birthday Celebration', extraRemark: 'First Visit, Pratiksha Ingale Birthday Celebrate, Rice And Biskit' },
  { id: 'gate_jun30_2', srNo: 2, date: '30-Jun-26', visitorName: 'Pratiksha Ingale', dateOfBirth: '30/06/2005', mobileNo: '9359820373', address: 'Isabavi', remarks: 'Donation', extraRemark: 'Donation goods' },
  { id: 'gate_jun30_3', srNo: 3, date: '30-Jun-26', visitorName: 'Nana Gadhave', dateOfBirth: '11/7/1997', mobileNo: '9284208190', address: 'Takali', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun30_4', srNo: 4, date: '30-Jun-26', visitorName: 'Ganesh Dhotre', dateOfBirth: '12/11/1999', mobileNo: '7758801984', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun30_5', srNo: 5, date: '30-Jun-26', visitorName: 'Sarang Kile', dateOfBirth: '16/7/1993', mobileNo: '9029166606', address: 'Narayan Chiroli', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun30_6', srNo: 6, date: '30-Jun-26', visitorName: 'Mauli Lad', dateOfBirth: '27/7/1967', mobileNo: '7020548262', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'First Visit, Reference Ashish Shah, Pratham denagi' },
  { id: 'gate_jun30_7', srNo: 7, date: '30-Jun-26', visitorName: 'Yogeshwar Lad', dateOfBirth: '27/7/1967', mobileNo: '9923070199', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun30_8', srNo: 8, date: '30-Jun-26', visitorName: 'Dilip Kesakar', dateOfBirth: '28/3/1962', mobileNo: '9420360596', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Food And cloths, Nehami yetat' },
  { id: 'gate_jun30_9', srNo: 9, date: '30-Jun-26', visitorName: 'Sarika Mahadik', dateOfBirth: '9/6/1984', mobileNo: '9960290490', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun30_10', srNo: 10, date: '30-Jun-26', visitorName: 'Pratik Dabak', dateOfBirth: '1/3/1996', mobileNo: '8669071993', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },

  { id: 'gate_jun29_1', srNo: 1, date: '29-Jun-26', visitorName: 'Sachin Mane', dateOfBirth: '19/2/1989', mobileNo: '9766987301', address: 'Indapur', remarks: 'New Palawi Admission', extraRemark: 'Kartik Mane Admission reference, First Visit Reference Archana Didi, Class 5th admission jhale' },
  { id: 'gate_jun29_2', srNo: 2, date: '29-Jun-26', visitorName: 'Kartik Sachin Mane', dateOfBirth: '18/10/2015', mobileNo: '9766987301', address: 'Indapur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun29_3', srNo: 3, date: '29-Jun-26', visitorName: 'Tukaram Harihar', dateOfBirth: '19/12/1975', mobileNo: '9890798042', address: 'Nira', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun29_4', srNo: 4, date: '29-Jun-26', visitorName: 'Rajkumar Salunkhe', dateOfBirth: '11/11/1977', mobileNo: '9823355008', address: 'Nira', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun29_5', srNo: 5, date: '29-Jun-26', visitorName: 'Nandkumar Bhandalkar', dateOfBirth: '5/12/1977', mobileNo: '9545139222', address: 'Mandaki', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun29_6', srNo: 6, date: '29-Jun-26', visitorName: 'Maya Sangolkar', dateOfBirth: '30/6/1976', mobileNo: '9850686405', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Reference Bai, Play Group Chya Mulanna Shikavanyasthi Yenar Hotya' },
  { id: 'gate_jun29_7', srNo: 7, date: '29-Jun-26', visitorName: 'Kalyani Sangolkar', dateOfBirth: '4/3/2004', mobileNo: '8767885363', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Visitor' },
  { id: 'gate_jun29_8', srNo: 8, date: '29-Jun-26', visitorName: 'Mandar Tarange', dateOfBirth: '6/9/1993', mobileNo: '9370313429', address: 'Piliv', remarks: 'Visit', extraRemark: 'Visitor' },
  { id: 'gate_jun29_9', srNo: 9, date: '29-Jun-26', visitorName: 'Vaibhav Pandit', dateOfBirth: '30/6/1978', mobileNo: '7796520777', address: 'Tasagaon', remarks: 'Donation', extraRemark: 'New Cycle 6 Donate Gurudipsingh JayavantSingh' },
  { id: 'gate_jun29_10', srNo: 10, date: '29-Jun-26', visitorName: 'Prasad Salunkhe', dateOfBirth: '21/6/2006', mobileNo: '7058818468', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },

  { id: 'gate_jun28_1', srNo: 1, date: '28-Jun-26', visitorName: 'Vinayak Pandal', dateOfBirth: '31/12/1987', mobileNo: '9877613670', address: 'Solapur', remarks: 'Meet colleagues from Palawi', extraRemark: 'Latika Va Archana Dudam Tai La Ghevun Janyasathi' },
  { id: 'gate_jun28_2', srNo: 2, date: '28-Jun-26', visitorName: 'Kranti More -Sule', dateOfBirth: '24/5/1993', mobileNo: '9833246859', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Meet Bai Reference Radhesh Bhaiya, Navin Nyayadhish Pandharpur First Visit' },
  { id: 'gate_jun28_3', srNo: 3, date: '28-Jun-26', visitorName: 'Sandeep Sule', dateOfBirth: '3/5/1987', mobileNo: '9834384689', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun28_4', srNo: 4, date: '28-Jun-26', visitorName: 'Gini Bhayani', dateOfBirth: '28/6/2026', mobileNo: '8830133001', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_jun28_5', srNo: 5, date: '28-Jun-26', visitorName: 'Mauli Mote', dateOfBirth: '25/12/2006', mobileNo: '8263863704', address: 'Waluj', remarks: 'Visit', extraRemark: 'Visitor' },
  { id: 'gate_jun28_6', srNo: 6, date: '28-Jun-26', visitorName: 'Rahul Pawar', dateOfBirth: '23/3/2006', mobileNo: '7350120774', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_jun28_7', srNo: 7, date: '28-Jun-26', visitorName: 'Atharv Mahamuni', dateOfBirth: '24/1/2002', mobileNo: '7218761565', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Sound Ghenyasathi' },
  { id: 'gate_jun28_8', srNo: 8, date: '28-Jun-26', visitorName: 'Anuradha Kharat', dateOfBirth: '7/11/1995', mobileNo: '8605658785', address: 'Takali', remarks: 'Visit', extraRemark: 'Polio Lasikaran denyasathi' },
  { id: 'gate_jun28_9', srNo: 9, date: '28-Jun-26', visitorName: 'Sujata Savant', dateOfBirth: '16/10/1983', mobileNo: '7083976030', address: 'Takali', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun28_10', srNo: 10, date: '28-Jun-26', visitorName: 'Sujata Sanjay Shaha', dateOfBirth: '5/7/1969', mobileNo: '9175271790', address: 'Karamala', remarks: 'Visit', extraRemark: 'Visitor' },
  { id: 'gate_jun28_11', srNo: 11, date: '28-Jun-26', visitorName: 'Amol Mahavir Shaha', dateOfBirth: '6/12/1986', mobileNo: '9423333829', address: 'Karamala', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun28_12', srNo: 12, date: '28-Jun-26', visitorName: 'Dr. P.V. Shahane', dateOfBirth: '5/2/2000', mobileNo: '9172214557', address: 'Pandharpur', remarks: 'Birthday Celebration', extraRemark: 'Animal Rahat = 8530212717, Dr prathamesh Shahane Birthday nimitta Lactogen Milk Powder Donate' },
  { id: 'gate_jun28_13', srNo: 13, date: '28-Jun-26', visitorName: 'Vijay Shahane', dateOfBirth: '28/6/1971', mobileNo: '9960626210', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun28_14', srNo: 14, date: '28-Jun-26', visitorName: 'Sujay Shahane', dateOfBirth: '18/3/2004', mobileNo: '8999478236', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun28_15', srNo: 15, date: '28-Jun-26', visitorName: 'Madhavi Shahane', dateOfBirth: '15/9/1978', mobileNo: '8080746982', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_jun28_16', srNo: 16, date: '28-Jun-26', visitorName: 'Devayani Deshmukh', dateOfBirth: 'N/A', mobileNo: '9822000000', address: 'Mangalwedha', remarks: 'Donation', extraRemark: 'Lactogen No.1 Milk Powder Donate 12 Nos' },

  // --- MAY 2026 (Descending: 31-May down to 01-May) ---
  { id: 'gate_may31_1', srNo: 1, date: '31-May-26', visitorName: 'Samadhan Bansode', dateOfBirth: '05/09/1986', mobileNo: '9921872683', address: 'Korti', remarks: 'Donation', extraRemark: 'Cloths' },
  { id: 'gate_may31_2', srNo: 2, date: '31-May-26', visitorName: 'Dr. Satyanand Chitte', dateOfBirth: '27/03/1987', mobileNo: '9765168626', address: 'Navi Mumbai', remarks: 'Visit', extraRemark: 'Came with Dr. Mitali Waje' },
  { id: 'gate_may31_3', srNo: 3, date: '31-May-26', visitorName: 'Dr. Mitali Waje', dateOfBirth: '24/04/1991', mobileNo: '7021661683', address: 'Navi Mumbai', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_may31_4', srNo: 4, date: '31-May-26', visitorName: 'Indira Chitte', dateOfBirth: '25/12/1968', mobileNo: '7378760123', address: 'Navi Mumbai', remarks: 'Visit', extraRemark: 'Came with Dr. Mitali Waje' },
  { id: 'gate_may31_5', srNo: 5, date: '31-May-26', visitorName: 'Yogesh Chitte', dateOfBirth: '26/08/1993', mobileNo: '9769155186', address: 'Navi Mumbai', remarks: 'Visit', extraRemark: 'Came with Dr. Mitali Waje' },
  { id: 'gate_may31_6', srNo: 6, date: '31-May-26', visitorName: 'Jyoti Bedse', dateOfBirth: '11/07/1973', mobileNo: '9156823177', address: 'Navi Mumbai', remarks: 'Visit', extraRemark: 'Came with Dr. Mitali Waje' },
  { id: 'gate_may31_7', srNo: 7, date: '31-May-26', visitorName: 'Dr. Mahesh Deolkar', dateOfBirth: '01/06/1949', mobileNo: '9823191159', address: 'Latur', remarks: 'Visit', extraRemark: 'Cloths donation meet with bai' },
  { id: 'gate_may31_8', srNo: 8, date: '31-May-26', visitorName: 'Rajabhau Salunkhe', dateOfBirth: '04/03/1972', mobileNo: '9423076990', address: 'Latur', remarks: 'Accompany Visitor', extraRemark: 'Came with Dr. Mahesh Deolkar' },
  { id: 'gate_may31_9', srNo: 9, date: '31-May-26', visitorName: 'Narsinh Kasale', dateOfBirth: '13/08/1994', mobileNo: '7775040206', address: 'Latur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_may31_10', srNo: 10, date: '31-May-26', visitorName: 'Gangadhar Khedkar', dateOfBirth: '10/12/1968', mobileNo: '9423346529', address: 'Latur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_may31_11', srNo: 11, date: '31-May-26', visitorName: 'Vikram Bhuse', dateOfBirth: '08/01/1985', mobileNo: '9960801757', address: 'Latur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },
  { id: 'gate_may31_12', srNo: 12, date: '31-May-26', visitorName: 'Anupritas Gawali', dateOfBirth: '15/04/1979', mobileNo: '8080567750', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Food Grain' },
  { id: 'gate_may31_13', srNo: 13, date: '31-May-26', visitorName: 'Pushpa Kale', dateOfBirth: '19/07/1989', mobileNo: '9309944008', address: 'Pandharpur', remarks: 'Accompany Visitor', extraRemark: 'Came with Anupritas Gawali' },
  { id: 'gate_may31_14', srNo: 14, date: '31-May-26', visitorName: 'Radha Thombare', dateOfBirth: '08/04/1984', mobileNo: '9198098912', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Food Grain' },
  { id: 'gate_may31_15', srNo: 15, date: '31-May-26', visitorName: 'Mahesh Khadatare', dateOfBirth: '01/06/1956', mobileNo: '7350655865', address: 'Degaon', remarks: 'Visit', extraRemark: 'Birthday celebration inquiry' },
  { id: 'gate_may31_16', srNo: 16, date: '31-May-26', visitorName: 'Jinat Shekh', dateOfBirth: 'N/A', mobileNo: '8976459580', address: 'Mumbai', remarks: 'Visit', extraRemark: 'Aalisha Sodanyasathi' },
  { id: 'gate_may31_17', srNo: 17, date: '31-May-26', visitorName: 'Vidya Karanvar', dateOfBirth: '11/05/2009', mobileNo: '8767042179', address: 'Solapur', remarks: 'Children Meet', extraRemark: 'Rushali la bhetanyasathi' },
  { id: 'gate_may31_18', srNo: 18, date: '31-May-26', visitorName: 'Tabbsam Shekh', dateOfBirth: '14/01/1998', mobileNo: '7410538441', address: 'Solapur', remarks: 'Accompany Visitor', extraRemark: 'Visitor' },

  // --- APRIL 2026 (Descending: 30-Apr down to 01-Apr) ---
  { id: 'gate_apr30_1', srNo: 1, date: '30-Apr-26', visitorName: 'Mahesh Kodupale', dateOfBirth: '1/4/1986', mobileNo: '7350171219', address: 'Nagpur', remarks: 'Birthday Celebration', extraRemark: 'Birthday Celebration' },
  { id: 'gate_apr30_2', srNo: 2, date: '30-Apr-26', visitorName: 'Shitai Wagh', dateOfBirth: '1/1/1990', mobileNo: '9673664455', address: 'Phaltan', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_apr30_3', srNo: 3, date: '30-Apr-26', visitorName: 'Sagarkumar Gupta', dateOfBirth: '5/1/1992', mobileNo: '9558447682', address: 'Nanded', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_apr30_4', srNo: 4, date: '30-Apr-26', visitorName: 'Rohan Randive', dateOfBirth: '20/5/1990', mobileNo: '9226034725', address: 'Pandharpur', remarks: 'Visit', extraRemark: 'Apran jama karne' },
  { id: 'gate_apr30_5', srNo: 5, date: '30-Apr-26', visitorName: 'Sujata Gole', dateOfBirth: '18/11/1999', mobileNo: '9834065815', address: 'Penur', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_apr30_6', srNo: 6, date: '30-Apr-26', visitorName: 'Avinash Bansode', dateOfBirth: '30/9/1997', mobileNo: '9284757510', address: 'Fulchincoli', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_apr30_7', srNo: 7, date: '30-Apr-26', visitorName: 'Amit Pawar', dateOfBirth: '12/12/1993', mobileNo: '7503707070', address: 'Pandharpur', remarks: 'Maintenance', extraRemark: 'Internet kamasathi' },

  // --- MARCH 2026 (Descending: 31-Mar down to 01-Mar) ---
  { id: 'gate_mar31_1', srNo: 1, date: '31-Mar-26', visitorName: 'Rajendra Bhosale', dateOfBirth: '12/5/1978', mobileNo: '9822000000', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Food Grain' },
  { id: 'gate_mar31_2', srNo: 2, date: '31-Mar-26', visitorName: 'Sunita Kale', dateOfBirth: '15/8/1982', mobileNo: '9822111222', address: 'Solapur', remarks: 'Visit', extraRemark: 'Project Visit' },
  { id: 'gate_mar31_3', srNo: 3, date: '31-Mar-26', visitorName: 'Aniket Shinde', dateOfBirth: '10/2/1995', mobileNo: '9765586565', address: 'Sangola', remarks: 'Birthday Celebration', extraRemark: 'Birthday' },

  // --- FEBRUARY 2026 (Descending: 28-Feb down to 01-Feb) ---
  { id: 'gate_feb28_1', srNo: 1, date: '28-Feb-26', visitorName: 'Prakash Suravase', dateOfBirth: '15/7/1975', mobileNo: '9421060067', address: 'Aran', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_feb28_2', srNo: 2, date: '28-Feb-26', visitorName: 'Nirmala Suravase', dateOfBirth: '26/12/1984', mobileNo: '8308973554', address: 'Aran', remarks: 'Visit', extraRemark: 'Visit' },
  { id: 'gate_feb28_3', srNo: 3, date: '28-Feb-26', visitorName: 'Sanket Khandagale', dateOfBirth: '26/12/1996', mobileNo: '8308585165', address: 'Pandharpur', remarks: 'Donation', extraRemark: 'Cloths' },

  // --- JANUARY 2026 (Descending: 31-Jan down to 01-Jan) ---
  { id: 'gate_jan31_1', srNo: 1, date: '31-Jan-26', visitorName: 'Ashok Patil', dateOfBirth: '10/4/1979', mobileNo: '9767372727', address: 'Akluj', remarks: 'Donation', extraRemark: 'Sahitya' },
  { id: 'gate_jan31_2', srNo: 2, date: '31-Jan-26', visitorName: 'Payal Lokare', dateOfBirth: '16/10/2009', mobileNo: '9860960828', address: 'Shelave', remarks: 'Children Meet', extraRemark: 'Krushna La Bhetanyasathi' },
  { id: 'gate_jan31_3', srNo: 3, date: '31-Jan-26', visitorName: 'Abhijit Lokare', dateOfBirth: '5/10/2003', mobileNo: '9860960828', address: 'Shelave', remarks: 'Accompany Visitor', extraRemark: 'Visitor' }
];
