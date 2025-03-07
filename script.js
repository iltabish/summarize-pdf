
let url="https://api.apyhub.com/ai/summarize-documents/file";
let btn1=document.querySelector(".Summarize");
let btn2=document.querySelector(".Download");

    btn1.addEventListener("click",async ()=>{
    let fileInput=document.querySelector("#fileUpload");
    let file=fileInput.files[0];
     

    if(!file){
        alert('Please Upload File');
        return;
    }
    let formData=new FormData();
    formData.append("file",file);
    formData.append("summary_length", "medium"); 
    formData.append("output_language", "en"); 

    let response=await fetch(url,{
       method:"POST",
       headers: {
        "apy-token": "APY0sEleIgiqCToV2BTl9SFLtCosbGuqdicmPBMnFotlIhW7F9RAsMtl2m9ifYdBZyTTi1I3"
    },
       body:formData
    });

    console.log(response);
    let data=await response.json();
    let element=document.querySelector("#content");
    element.innerText=data.data.summary;
    console.log(data.data.summary);
});
const generatePdf=()=>{
    let element=document.querySelector("#content");
    if(element.innerText!=""){
    html2pdf().from(element).save('generatePdf');
    }else{
        alert('Please first upload file');
    }
}
btn2.addEventListener("click",generatePdf);