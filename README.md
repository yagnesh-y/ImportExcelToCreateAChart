This is a simple usage of excel parser using 'XLSX' and creating a line
chart using 'react-chartjs-2'

User can upload excel sheet of given format and line chart is populated. Parsed excel sheet
data is also sent to server using 'superagent'

Sample rows of excel data is as shown below:

SERIES1	1990|20	1991|21	1992|22	1993|23	1995|24	1996|25	1997|26	1998|27	1999|28	1999|29	2000|30

SERIES2	1991|10	1992|12	1994|16	1993|37	1995|18	1996|24	1997|21	1998|23	1999|31	1999|32	2000|22

SERIES1 and SERIES2 represents two rows of data with its corresponding values to be X and Y axis values respectively which are seperated by '|'

Steps to use:

git clone

cd project_directory

npm install

webpack

npm start

localhost:3000

Upload excel sheet of the above specified format. Find Line charts formed from the data supplied by you. :)
