import React from "react";
interface Props{
    items:any;
    register:any;
    [key: string]: any;  
}
export const Check=(props:Props)=>{
    const{name,register,...rest}=props;
    return(
    <div className="flex justify-between">
        <div>Giới tính: </div>
        {
            props.items.map((item:any)=>(
                <div key={item.value} className="flex gap-1">
                    <div>{item.title}</div>
                    <input
                    type="radio"
                    value={item.value}
                    name={item.name}
                    id={item.id}
                    {...rest}
                    {...register(item.name)}
                    />
                    
                </div>
            ))

        }
    </div>
        
    )
}
