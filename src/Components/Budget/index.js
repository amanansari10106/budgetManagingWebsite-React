import React, { useEffect, useState } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import { BsFillPlusCircleFill,BsTrash, BsPencil, BsFolderCheck } from "react-icons/bs";
import {
    budgetData , 
    columnData, 
    multiplication, 
    titleColors, 
    setToPosition,
    backgroundHighlights,
    roundTo
} from '../../constants';
import highcharts3d from "highcharts/highcharts-3d";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

highcharts3d(Highcharts);

function Budget() {

    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [message, setMessage] = useState('');
    const [index, setIndex] = useState(0);
    const [isOpen, setOpen] = useState(false);

    useEffect(()=>{
        getData();
    },[]);

    useEffect(()=>{
        getChartData();            
    },[data]);

    const getData = async () => {
        const budgets = reactLocalStorage.getObject('budgets');
        if(!(budgets && (budgets.length || Object.keys(budgets).length))) {
            console.log("printing budgetdata")
            console.log(budgetData)
            reactLocalStorage.setObject('budgets',[budgetData]);
            setData(budgetData);
        } else {
            console.log("printing budgetdata")
            console.log(JSON.stringify(budgetData))
            setData(budgets);
        }
    }

    const addBudget = () => {
        const _budgets = reactLocalStorage.getObject('budgets');
        _budgets.push(_budgets[_budgets.length-1]);
        reactLocalStorage.setObject('budgets',_budgets);
        showMessage('Budget successfully added!');
        getData();
    }

    const deleteBudget = (e) => {
        if(window.confirm('Are you sure you want to delete this budget?')){
            const _budgets = reactLocalStorage.getObject('budgets');
            _budgets.splice(index,1);
            reactLocalStorage.setObject('budgets',_budgets);
            showMessage('Budget successfully deleted!');
            getData();    
        }
    }

    const saveBudget = () => {
        reactLocalStorage.setObject('budgets',data);
        showMessage('Budget successfully saved!');
        getData();
    }

    const showMessage = (msg) =>{
        setMessage(msg);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    }

    const getTotal = (item,tab,column,index)=> {
        let sum = 0;
        Object.keys(item[tab]).map(colTab=>{
            if(index>0){
                sum = sum + (parseFloat(item[tab][colTab]['Weekly Net']) || 0)* multiplication[index] ;                                                            
            } else {
                sum = sum + (parseFloat(item[tab][colTab][column]) || 0);                                                            
            }
        });
        return roundTo(sum);
    }

    const getChartData = () => {
        if(data && data.length) {
            data.forEach((item,i)=> {
                let chart = [];
               if(item && Object.keys(item)) {
                Object.keys(item).map((tab) => {

                    if(item[tab] && Object.keys(item[tab])){
                        let sum = 0;

                        Object.keys(item[tab]).map(colTab=>{
                            sum = sum + (parseFloat(item[tab][colTab]['Weekly Net']) || 0);                                                            
                        });

                        let insert = {
                          color: titleColors[tab],
                          label: `${tab} $${sum*365}`,
                          value: sum*365,
                        };
                        if(sum) {
                            chart.push(insert);
                        }
                    }
                  });          
               }
                setChartData((prev)=>{
                    return {...prev , 
                        [`Budget ${i+1}`]: [...chart],        
                    }
                });
            })    
        }
    }

    const toggleOpen = () => setOpen(!isOpen);

    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;
    
    return (
        <div className="container text-center mt-4">
            {message && 
                <div className="alert alert-success m-4">
                    {message}
                </div>
            }
            <div className="row budget-bar text-white">
                <div className="col margin-title">
                    <p className="title">Budget</p>
                </div>
                <div className="col mt-4">
                    <select onChange={(e)=>{setIndex(e.target.value)}} className="form-control form-control-sm">
                        {data && data.length && data.map((item,i) =>
                            <option key={i} value={i}>
                                {`budget ${i+1}`}
                            </option>    
                        )}
                    </select>
                </div>
                <div className="col mb-4">
                    <button onClick={addBudget} className="btn btn-actions" style={{width:175}}><BsFillPlusCircleFill className="icon-style"/>Add a budget</button>
                </div>
                <div className="col mb-4">

                <div onClick={toggleOpen} className="dropdown">
                    <button className="btn btn-actions dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <BsTrash className="icon-style"/>
                    Delete
                    </button>
                    <div className={menuClass} aria-labelledby="dropdownMenuButton">
                        {data && data.length && data.map((item,i) =>
                            <a style={{cursor:'pointer'}} className="dropdown-item" onClick={()=>deleteBudget(i)} key={i} value={i}>
                                {`budget ${i+1}`}
                            </a>    
                        )}
                    </div>
                </div>

                </div>
                <div className="col mb-4">
                    <button onClick={saveBudget} className="btn btn-actions"><BsFolderCheck className="icon-style"/>Save</button>
                </div>
            </div>
            <div className="mt-3 mb-3 row" style={{width: `${800*data.length}px`}}>
                {data && data.length && data.map((item,i) =>
                <div className="col bordered-budget mr-2">
                    <div key={i} >
                        {chartData && chartData[`Budget ${i+1}`] ?
                            <>
                            <input 
                                type="text" 
                                className="form-control text-center font-weight-bold mb-2"
                                value={data[i].title}
                                onChange={(e)=>{
                                    const _data = [...data];
                                    _data[i].title = e.target.value
                                    setData(_data);
                                }}
                                placeholder="Enter Budget Name"
                            />
                            <div className="chart-background">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                    title: '',
                                    type: 'pie',
                                    options3d: {
                                       enabled: true,
                                       alpha: 45,
                                       beta: 0    
                                    },
                                    backgroundColor:"transparent",
                                    labels:{
                                        style:{
                                            "color":"#FFF",
                                            fontWeight:"600"    
                                        }
                                    },
                                    chart: {
                                        type: "pie",
                                        options3d: {
                                          enabled: true,
                                          alpha: 45,
                                          beta: 0
                                        },
                                        backgroundColor:"transparent",
                                        labels:{
                                            style:{
                                                "color":"#FFF",
                                                fontWeight:"600"    
                                            }
                                        },
                                      },
                                    plotOptions : {
                                        pie: {
                                           innerSize: 225,
                                           depth: 35
                                        }
                                    },
                                    series: [{
                                        type:"pie",
                                        colors:[...chartData[`Budget ${i+1}`].map((s)=>s.color)],
                                        data: [
                                            ...chartData[`Budget ${i+1}`].map((s)=> [s.label , s.value])
                                        ]        
                                    }]
                                }}
                            />
                            </div>

                            </>
                        :""}

                        {item && Object.keys(item).length && Object.keys(item).map((tab,tabNumber)=>
                            <>
                            {!(tab === 'title') ? 
                            <>
                            <table className="table table-bordered text-center mt-4">
                                <thead>
                                    <tr>
                                    <th className="title-column default-background" scope="col">
                                        {!tab ? 
                                        <input onBlur={(e)=> {
                                            const _data = [...data];
                                            Object.defineProperty(_data[i], e.target.value,
                                                Object.getOwnPropertyDescriptor(_data[i], ""));
                                            delete _data[i][""]
                                            setData(_data);
                                        }}  className="form-control form-control-sm" type="text"/>
                                    
                                        : 
                                            tab
                                        }
                                        </th>
                                    {columnData && Object.keys(columnData) && Object.keys(columnData).length && Object.keys(columnData).map((column,columnIndex)=>
                                        <th className="default-background" scope="col">{column}</th>                                    
                                    )}
                                    <th className="default-background" scope="col"><BsPencil className=" text-white icon-style"/></th>                                    
                                    </tr>
                                </thead>
                                <tbody>
                                {item[tab] && Object.keys(item[tab]) && Object.keys(item[tab]).length && Object.keys(item[tab]).map((tabData)=>
                                    <tr>
                                        {!tabData ? 
                                            <td className="align-center" scope="col"><input onBlur={(e)=> {
                                                const _data = [...data];
                                                delete _data[i][tab][''];
                                                _data[i][tab] = setToPosition(_data[i][tab],e.target.value);
                                                setData(_data);
                                            }}  className="form-control form-control-sm" type="text"/></td>
                                        :
                                            <th scope="row">{tabData}</th>
                                        }
                                        {columnData && Object.keys(columnData) && Object.keys(columnData).length && Object.keys(columnData).map((column,index)=>
                                             <>
                                            {(index === 0 && !(tabData.includes('Total')) || column === "Notes") ? 
                                                <td className="align-center" scope="col"><input onChange={(e)=> {
                                                    const _data = [...data];
                                                    _data[i][tab][tabData][column] = e.target.value;
                                                    setData(_data);
                                                }} value={data[i][tab][tabData][column]} className="weekly-width form-control form-control-sm" type={`${column === 'Notes' ? 'text': 'number'}`}/></td>
                                                    : 
                                                tabData.includes('Total') ?
                                                    
                                                    <td scope="col">${getTotal(item,tab,column,index)}</td>                                                                            
                                                    : 

                                                <td scope="col">${roundTo((data[i][tab][tabData]['Weekly Net'] || 0) * multiplication[index])}</td>                                                                            
                                            }
                                           </>
                                        )}
                                        {!(tabData.includes('Total')) ?
                                            <td onClick={()=>{
                                                const _data = [...data];
                                                delete data[i][tab][tabData]
                                                setData(_data);
                                            }} style={{cursor: 'pointer'}} scope="col"><BsTrash className="icon-style"/></td>                                                                            
                                        :
                                            <td scope="col"></td>                                                                            
                                        }
                                    </tr>
                                )}

                                </tbody>
                            </table>                     

                            <button onClick={()=>{
                                const _data = [...data];
                                _data[i][tab] = setToPosition(_data[i][tab],"");
                                setData(_data);
                            }} className="btn btn-success row-add"><BsFillPlusCircleFill className="icon-style"/> Row</button>
                            </>
                            :""}
                            </>                        
                        )}                   
                    </div>

                    <button onClick={()=>{
                            const _data = [...data];
                            _data[i] = {..._data[i] , "": ""}
                            setData(_data);
                    }} className="btn margin-right btn-success row-add"><BsFillPlusCircleFill className="icon-style"/> Category</button>

                </div>
                )}




            </div>
        </div>
    );
}

export default Budget;
