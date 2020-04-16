
// // const getLengthOfStr = str => {
// // arr=[];
// // tmparr="";
// //   for(var i = 0 ; i <str.length;i++){
// //   var flag=false;

// //   for(var j = 0; j <tmparr.length; j++)
// //   {
          
// //     if(str[i]==tmparr[j])
// //     {
// //               flag=true;
// //               break;
// //     }
  
// //   }
  
// //   if(flag==false)
// //   {
// //     tmparr+=str[i];
// //   }
// //   else if(flag==true)
// //   {
// //     arr.push(tmparr);
// //     tmparr=str[i];
// //     flag=false;
// //   }
// // }
 

// // arr.push(tmparr);
// //   var max=0;
// //   for(var i = 0; i<arr.length;i++){
// //       arr[i].length>max? max=i: max=max;
// //   }
  
// //   return arr[max].length;


// // }
  


// // console.log(getLengthOfStr("abcdefghcijklmnop"))



// const test = str=>{
// arr=[];
// var tmp="";

// var flag = false;
//   for(var i =0; i<str.length;i++){
//     tmp=str[i];
//     for(var j = i+1 ; j<str.length;j++){
//       if(str[i]==str[j]){
//        arr.push((tmp));
//        tmp="";
//         flag=true;
//        break; 
       
//       } else{
//         tmp+=str[j];
//       }
//     }
//     if(flag==false){
//       arr.push(tmp);
//       tmp="";
//     }
//     // console.log(str.length-i);
//   }

//   console.log(arr);
// }

// console.log(test("abcabc"));



// const getLengthOfStr = str => {
// arr=[];
// tmparr="";
//   for(var i = 0 ; i <str.length;i++){
//   var flag=false;

//   for(var j = 0; j <tmparr.length; j++)
//   {
          
//     if(str[i]==tmparr[j])
//     {
//               flag=true;
//               break;
//     }
  
//   }
  
//   if(flag==false)
//   {
//     tmparr+=str[i];
//   }
//   else if(flag==true)
//   {
//     arr.push(tmparr);
//     tmparr=str[i];
//     flag=false;
//   }
// }
 

// arr.push(tmparr);
//   var max=0;
//   for(var i = 0; i<arr.length;i++){
//       arr[i].length>max? max=i: max=max;
//   }
  
//   return arr[max].length;


// }
  


// console.log(getLengthOfStr("abcdefghcijklmnop"))


const checkTmp = (tmp,char)=>{

  for(var j =0;j<tmp.length;j++){
      if(tmp[j]==char)
        return true;
  }
  return false;
}

const getLengthOfStr = str=>{
  arr=[];
  var tmp="";
  
    for(var i =0; i<str.length;i++){
   
      for(var j = i; j<str.length;j++){
      var chk = checkTmp(tmp,str[j])
      // console.log(chk);
      if(chk==false){
         tmp+=str[j];
        }else if(chk==true){
          break;
        }
      }
      arr.push(tmp);
      tmp="";

      // console.log(arr);
    }
  var max=0;
    for (var i = 0; i<arr.length;i++){
      if(max<arr[i].length){
        max=arr[i].length;
      }
    }

    console.log(max);
    return max;
  }

  // tmp+=str[i];
  // for(var j = 0; j<tmp.length;j++){
  //   if(str[i]==tmp[j]){
  //     flag=true;

  //   }
  // }
  
  console.log(getLengthOfStr("abcdefghcijklmnop"));