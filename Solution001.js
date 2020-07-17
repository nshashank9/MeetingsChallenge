function findAvailability(meetingDuration, ...cals) {
  var duration = meetingDuration/60;
  var [c1,c2] = [...cals];
  var min,max;
  var b = [];
     
  var cc1 = c1.daybounds.map( function( row ) {
          let r = row.split(":");
         return parseInt(r[0]) + parseInt(r[1])/60;
  } );
   var cc2 = c2.daybounds.map( function( row ) {
          let r = row.split(":");
         return parseInt(r[0]) + parseInt(r[1])/60;
  } );
  min = Math.max(cc1[0],cc2[0]);
  max = Math.min(cc1[1],cc2[1]);  

 const cl1 = c1.meetings.map( function( row ) {
    return row.map( function( cell ) { 
         let num = cell.split(':');
         num[1] = num[1]/60; 
         return parseInt(num[0]) + parseFloat(num[1])
    } );
} )
const cl2 = c2.meetings.map( function( row ) {
    return row.map( function( cell ) { 
         let num = cell.split(':');
         num[1] = num[1]/60; 
         return parseInt(num[0]) + parseFloat(num[1])
    } );
} )

const k = cl1.concat(cl2);
k.sort(function(a,b){
  return a[1]-b[1]
}).push([max,max])
 
for(i=0;i<k.length-1;i++){
   if(k[i+1][0] - k[i][1] >= duration)
     {
        b.push([k[i][1],k[i+1][0]])
        
     }
 }  
   const availArray = b.map( function( row ) {
    return row.map( function( cell ) { 
            var d =  cell - Math.floor(cell);
            var con = d * 60;
            if(con>0){
            return Math.floor(cell).toString() + ":" + con.toString();
            } else{
               return Math.floor(cell).toString() + ":00";
            } 
     } );
} )

console.log(availArray)
    return availArray;
}
