const users=['John','Jane','Bob']
function calculateSum(a,b){
return a+b
}

for(let i=0;i<users.length;i++){
console.log(users[i])
}

function processData(data){
if(data){
return data.map(item=>item.name)
}
return null
}

export {calculateSum,processData}
