import Button from "./Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DataTable } from "./DataTable";

export const categories = [" ", "Groceries", "utilities", "Entertainment"] as const;

const schema = z.object({
    description: z.string().min(3, {message: "Description should be atleast 3 characters."}),
    amount: z.number({invalid_type_error: "Amount is required."}),
    category: z.enum(categories).refine((item) => categories[0] !== item, {message: "Category is required."})
});

export type FormInfos = z.infer<typeof schema>

export const Form = () => {
    const [dataList, setDataList] = useState<FormInfos[]>([]);  
    //const dataList: FormData[] = [];
    const {
        register, handleSubmit,
        formState: { errors },
    } = useForm<FormInfos>({resolver: zodResolver(schema)})

    const onSubmit = (data : FormInfos) =>{
        const item : FormInfos = {description: data.description, amount: data.amount, category: data.category }
        setDataList([...dataList, item])
        console.log(dataList);
    }
    const onDelete = (itemIndex: number) =>{
        setDataList(dataList.filter((_, index) => index != itemIndex));
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
                  
           <DataTable dataList={dataList} onDelete={onDelete}></DataTable>
      </>
    )
}
