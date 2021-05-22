
const { response } = require('express');
const express= require('express')
const app=express();

app.use(express.json());
let data=[
    {
    "id":1,
    "product":"HP laptop",
    "price":"$500"
}
,{
    "id":3,
    "product":"dell laptop",
    "price":"$1000"
}
]
app.get('/',(req,res)=>{
res.status(200).json({
    message:"All Product data",
    data
});
});

app.get('/:id',(req,res)=>{
   let result=data.filter((elem)=>elem.id ==+req.params.id);
   console.log(result);
   if(result)
   {
    res.status(200).json({
       result,
    });
   }
   else{
       res.status(404).json(
           {
               message:"product data not found",
           }
       )
   }
   
    
    });


app.post('/create-product',(req,res)=>
{
data.push(req.body);
console.log(data);
res.status(200).json({
    message:"product created"
})
})
app.put('/update-product/:id',(req,res)=>
{
   let ispresent = data.find(data=>data.id==req.params.id)
   if(ispresent)
   {
       let temp = {
           id:ispresent.id,
           product:req.body.product,
           price:req.body.price
        }
       data.splice(data.indexOf(ispresent),1,temp)
       res.status(200).json(
           {
               message : "product updated",
               
           })  
         }
});
 app.delete("/delete-product/:id",(req,res)=>
 {
     let ispresent = data.find((data)=>data.id==req.params.id)
     if(ispresent)
     {
         data.splice(data.indexOf(ispresent),1);
         res.status(200).json(
             {
                 message:"product deleted successfully"
             }
         )

     }
     else{
         res.status(404).json({
             message:"product not available"
         })
     }
 })



app.listen(4081)
