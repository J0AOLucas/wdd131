
const PI = 3.14;
let radius = 3;
                  

const one = 1;
const two = '2';
                    

let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
//console.log(student); //does not work, can't access a block variable outside the block


let selectElem = document.getElementById('webdevlist');
selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    console.log(codeValue);
})

const image = document.querySelector('img');
image.setAttribute('src', 'src/images/logos.jpg')
image.setAttribute('Alt', 'new logo with black background')

document.body.className = 'blue';

document.body.style.backgroundColor = 'lightblue';
                    