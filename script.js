
let url="https://api.apyhub.com/ai/summarize-documents/file";
let btn1=document.querySelector(".Summarize");
let btn2=document.querySelector(".Download");
let content=document.querySelector("#content");

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
    try{

        btn1.disabled = true;
        btn1.innerText = "Summarizing...";
        content.innerHTML = "<p>Please wait, summarizing the document...</p>";

    let response=await fetch(url,{
       method:"POST",
       headers: {
        "apy-token": "APY0sEleIgiqCToV2BTl9SFLtCosbGuqdicmPBMnFotlIhW7F9RAsMtl2m9ifYdBZyTTi1I3"
    },
       body:formData
    });
    let data=await response.json();

    if(!response.ok){
        if (data.message && data.message.includes("free limit")) {
            alert("You have reached the free limit of 5 API calls. Please try again tomorrow.");
        } else {
            alert("An error occurred while processing your request. Please try again later.");
        }
        return;
    }
    content.innerText=data.data.summary;
}catch(error){
    alert("Something went wrong. Please check your internet connection and try again.");
}finally{
    btn1.disabled = false;
    btn1.innerText = "Let Summarize";
}
});
const generatePdf=()=>{
    let element=document.querySelector("#content");
    if(element.innerText!=""){
    html2pdf().from(element).save('generatePdf');
    }else{
        alert('Please first upload file');
    }
};
btn2.addEventListener("click",generatePdf);