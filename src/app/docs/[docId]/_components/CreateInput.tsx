"use client"

import { Input} from "@/components/ui/input";



function CreateInput(){
    return (
        <>
            <Input 
            placeholder="Please enter your friend's name" name="username" 
            />
        </>
    );    
}

export default CreateInput;