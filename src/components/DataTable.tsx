import Button from "./Button";
import { FormInfos } from "./Form";

const tableHeaders = ["Description", "Amount", "Category", "Delete"] as const;

interface Props{
    dataList: FormInfos[];
    onDelete: (index: number) => void;
}

export  const DataTable = ({dataList, onDelete}:Props) => {
console.log("Data list: " + dataList);
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
                dataList.map((row, rowIndex) => (
                    <tr key = {rowIndex}>
                        {
                            tableHeaders.map((header) => (
                                <td key={`${rowIndex}-${header}`}>
                                    {
                                        header === 'Delete' 
                                        ? <Button type="button" color="danger" onClick = {() => onDelete(rowIndex)}>Delete</Button> 
                                        : row[header.toLowerCase() as keyof FormInfos]
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    </table>
    )
  }

