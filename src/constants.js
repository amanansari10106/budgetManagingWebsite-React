export const userData = {
    userName: 'admin',
    password: 'p@ssword123'
}

export const columnData = {
    "Weekly Net": 0,
    "Bi-Weekly Net": 0,
    "Monthly Net": 0,
    "Yearly Net": 0,    
    "Notes": '',
}

export const multiplication = {
    1: 2,
    2: 30,
    3: 365
}

export const titleColors = {
    income: 'blue',
    expenses: 'green',
    "Mortgage":'yellow',
    Insurance: '#add8e6',
    Utilities: 'red',
    Investment:'red',
    Groceries:'purple',
    "TV & Telephone":'brown',
    Personal:'brown',
    Loans: 'red'
}

export const backgroundHighlights = ['income','expenses','Mortgage'];

export const budgetData = {
    title: '',
    income: {
        "Shayin Net Income 29.72x40":{
            ...columnData
        },
        "Karthika Net Income 17.56905 x 40":{
            ...columnData
        },
        "Rental Income $1200":{
            ...columnData
        },
        "Total Income Available":{
            ...columnData
        },
    },
    expenses: {
       'Mortgage - 48.55%': {
            ...columnData
       },
       'Insurance - 6.64%': {
            ...columnData
       },
       'Utilities - 2.08%': {
            ...columnData
       },
       'Investment - 16.79%': {
            ...columnData
       },
       'Groceries - 8.42%': {
            ...columnData
       },
       'TV & Telephone - 4.43%': {
            ...columnData
       },
       'Personal - 0.18%': {
            ...columnData
       },
       'Loans - 12.91%': {
            ...columnData
       },
       'Total Expenditures': {
            ...columnData
       }
    },
    "Mortgage":{
        'Rowntree Mortgage -- From RBC Bi-Week': {
            ...columnData
        },
        'Ottawa Mortgage -- From RBC Bi-Week': {
            ...columnData
        },
        'Halifax Rent -- From RBC 1st of the Month': {
            ...columnData
        },
        'TORONTO Condo Fee -- From Scotia 1st of Every Monthly':{
            ...columnData
        },
        'OTTAWA Condo Fee -- From Scotia 1st of Every Monthly': {
            ...columnData
        },
        'OTTAWA Property Tax -- From RBC Every March 15 and June 15th':{
            ...columnData
        },
        'TORONTO Property Tax -- From RBC 1st of the Month':{
            ...columnData
        },
        'Total Mortgage Expenses': {
            ...columnData
        }
    },
    Insurance: {
        'Shine LI Foresters 100,000 Yearly Nov. 13 BMO MasterCard':{ ...columnData },
        'Shine LI Foresters 200,000 From RBC Monthly': {...columnData},
        'Karthika LI Foresters From RBC Monthly ': {...columnData},
        'Karthika LI RBC to VISA 6 Jul 2020 Monthly': {...columnData},
        'Wameka LI From RBC Monthly 6th': {...columnData},
        'Wameka Gerber LI From RBC Monthly 6th': {...columnData},
        'Wameka Sunlife Cirical Insuarance From RBC Monthly 6th' : {...columnData},        
        'Halifax W0794765':{...columnData}, 
        'Ottawa ON ($40.23 x 12)' : {...columnData},
        'Toronto ON W0884676': {...columnData}, 
        'Total Expenditures' : {...columnData},
    },
    Utilities: {
        'Toronto Hydro Bill CARMA':{ ...columnData },
        'Ottawa Hydro': {...columnData},
        'N.S Power ': {...columnData},
        'Total Utilities Payment': {...columnData},
   },
   Investment:{
       "Shayin":{
            'From RBTo Account: 409 - TFSA Weekly': {...columnData},
            'From Scotiabank to Quest Trade -':{...columnData},
            'TD TFSA DI':{...columnData},
            'Scotia RRSP -':{...columnData},
            'Scotia TFSA':{...columnData},
            "Total John's Investment": {...columnData},
       },
       "Karhika":{
            'Scotia RRSP - ':{...columnData},
            'RBC TFSA DI - From RBC PAC RBC TFSA Wkeely ':{...columnData},
            'RBC DI RRSP - From BSN to RBC RRSP 866- 18 ':{...columnData},
            'RBC DI Spousal RRSP -- 592 ':{...columnData}, 
            'TD DI TFSA - From Scotia To ':{...columnData},
            "Total Mark's Investment":{...columnData},
       },
       "Wameka":{
            'RBC Hi-Interest':{...columnData},
            'RBC TFSA -- From RBC PAC to Wkeely':{...columnData},
            'TD TFSA':{...columnData},
            'TD Student Account -':{...columnData},
            "Total Tracey's Investment":{...columnData},
       },
       "Total Investment ": {...columnData},
   },
   Groceries:{
        'Halifax Groceries':{...columnData},
        'Ottawa Groceries':{...columnData},
        'Transport':{...columnData},
        'Total Groceries Expenses': {...columnData}, 
   },
   "TV & Telephone":{
        'Telus Mobility':{...columnData},
        'City Wide Internet':{...columnData},
        'OTTAWA Internet BELL CANADA':{...columnData},
        'Halifax TV and Internet':{...columnData},
        'Phone Majijack':{...columnData},
        'Total TV & Telephone':{...columnData},
   },
   Personal:{
    'Goodlife Ottawa': {...columnData},
    'Royal Aeronautical Society': {...columnData},
    'Total Personal Payment': {...columnData},
   },
   Loans: {
    'Scotiabank LOC - Weekly': {...columnData},
    'ICICI BANK Weekly': {...columnData},
    'BMO Line of Credit - - Weekly': {...columnData},
    'RBC Home LOC': {...columnData},
    'TD RRSP Loan': {...columnData},
    'Shayin RRSP': {...columnData},
    'Karthika GIANT TIGER STORES': {...columnData},
    'Karthika RRSP TD': {...columnData},
    'Karthika Student Loan': {...columnData},
    'Total Loan Payment': {...columnData},
   }
}

export function setToPosition (obj,replaceWith) {
    console.log("hello")
    let keyValues = Object.entries(obj);
    console.log(keyValues)
    keyValues.splice(keyValues.length - 1,0, [replaceWith,{columnData}]);
    return Object.fromEntries(keyValues);
};

export function roundTo(num){
    return Math.round(num * 100) / 100
}