const ar =[1, [[2], 3], [4], 5, [6, 100, [[7], [[8]], 9]], 10]

function result(ar){
  return ar.reduce((acc,cur)=>{
    if(Array.isArray(cur)){
      return acc.concat(result(cur))
    }
    else if(Number.isInteger(cur)){
      return acc.concat(cur)
    }
  
    return acc;
  },[])
}

console.log(result(ar))



function zip(...sequences) {
  const maxLength = Math.max(...sequences.map(seq => seq.length));
  
  return Array.from({ length: maxLength }, (_, index) => (
    sequences.map(seq => seq[index])
  ));
}