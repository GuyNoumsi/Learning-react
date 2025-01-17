import Button from "../components/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { ExpenseDataTable } from "./Components/ExpenseDataTable";

export const categories = [" ", "Groceries", "utilities", "Entertainment"] as const;
export const filters = ["All categories","Groceries", "utilities", "Entertainment"]

const schema = z.object({
    description: z.string().min(3, {message: "Description should be atleast 3 characters."}),
    amount: z.number({invalid_type_error: "Amount is required."}),
    category: z.enum(categories).refine((item) => categories[0] !== item, {message: "Category is required."})
});

export type FormInfos = z.infer<typeof schema>

export interface ExpenseData {
    id: number,
    data: FormInfos
}

export const ExpenseForm = () => {
    const [dataList, setDataList] = useState<ExpenseData[]>([]);  
    const [filter, setFilter] = useState(filters[0]);
    const {
        register, handleSubmit, reset,
        formState: { errors },
    } = useForm<FormInfos>({resolver: zodResolver(schema)})

    const onSubmit = (data : FormInfos) =>{
        const item : ExpenseData = {id: dataList.length + 1, data: data }
        setDataList([...dataList, item])
        reset();
        console.log("form reset")
    }
    const onDelete = (itemIndex: number) =>{
        setDataList(dataList.filter((item) => item.id != itemIndex));
    }
    const onFilterChanged = (event: ChangeEvent<HTMLSelectElement>) =>{
        setFilter(event.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                  <label htmlFor="description" className = "form-label">
                      Description
                  </label>
                  <input {...register("description")} id = "description" type = "text" className="form-control"/>
                  {errors.description && (<p className= "text-danger">{errors.description.message}</p>)}
              </div>

              <div className="mb-3">
                  <label htmlFor="amount" className = "form-label">
                      Amount
                  </label>
                  <input {...register("amount", {valueAsNumber: true})}id = "amount" type = "text" className="form-control"/>
                  {errors.amount && (<p className= "text-danger">{errors.amount.message}</p>)}
              </div>

              <div className="mb-3">
                  <label htmlFor="category" className = "form-label">
                      Category
                  </label>
                  <select {...register("category") }id = "category"  className="form-control">
                      {
                          categories.map((item) => (
                              <option key = {item} value={item}>
                                  {item}
                              </option>
                          ))
                      }
                  </select>
                  {errors.category && (<p className= "text-danger">{errors.category.message}</p>)}
              </div>
                  
              <Button type="submit" onClick = {() => console.log("form submitted")} >Submit</Button>
            </form>
            <select id = "filter" style={{marginTop:'10px', display:'flex', width:'100%'}}  value = {filter} 
                onChange={onFilterChanged}>
                      {
                          filters.map((item) => (
                              <option key = {item} value={item}>
                                  {item}
                              </option>
                          ))
                      }
              </select>
                  
           <ExpenseDataTable dataList={dataList} onDelete={onDelete} filter={filter}></ExpenseDataTable>
      </>
    )
}
