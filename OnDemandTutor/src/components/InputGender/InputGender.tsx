import { useState } from "react"

export default function InputGender({}){
    const genders = [
        {id:'1',name:'Nam'},
        {id:'2',name:'Nữ'},
        {id:'3',name:'Khác'}
    ]
    const [checked,setChecked] = useState<any | null>(null);
    return(
        
        <>
            <div className="mt-4 flex justify-between pl-5 pr-5">
                {genders.map(gender =>(
                    <div key={gender.id} className="items-center flex gap-2">
                        <input type="radio"
                        checked={checked === gender.id}
                        onChange={()=> setChecked(gender.id)}
                        className="cursor-pointer h-5 w-5"
                        />
                        <span className="pt-1">{gender.name}</span>
                    </div>
                ))}
            </div>
            
        </>
    )
}