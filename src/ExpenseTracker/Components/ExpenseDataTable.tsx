import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import { ExpenseData, filters, FormInfos } from "../ExpenseForm";

const tableHeaders = ["Description", "Amount", "Category", "Delete"] as const;

interface Props{
    dataList: ExpenseData[];
    onDelete: (index: number) => void;
    filter: string;
}

export  const ExpenseDataTable = ({dataList, onDelete, filter}:Props) => {


const [priceTotal, setPriceTotal] = useState(0);

const filteredData = useMemo(() => {
    return filter == filters[0] ? dataList : dataList.filter((item) => item.data.category == filter);
  }, [dataList, filter]);
  
const getPriceTotal = () =>{
    let total = 0;
    filteredData.forEach(item => {
        total += item.data.amount;
    });
    setPriceTotal(Number(total.toFixed(2)));
}

useEffect(() =>{
getPriceTotal();
}),[filteredData]
    return (
        <table className="my-table">
        <thead>
            <tr>
                {
                    tableHeaders.map((header) => (
                        <th key={header}>{header} </th>
                    ))
                }
            </tr>
        </thead> 
        <tbody>
            {
                filteredData.map((row) => (
                    <tr key = {row.id}>
                        {
                            tableHeaders.map((header) => (
                                <td key={`${row.id}-${header}`}>
                                    {
                                        header === 'Delete' 
                                        ? <Button type="button" color="danger" onClick = {() => onDelete(row.id)}>Delete</Button> 
                                        : header.toLowerCase() === 'amount'? '$ '+ row.data[header.toLowerCase() as keyof FormInfos]: row.data[header.toLowerCase() as keyof FormInfos]
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))               
            }
            <tr>
                <td>Total</td>
                <td>{"$ "+priceTotal}</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
    )
  }

