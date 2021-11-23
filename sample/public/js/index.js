$(window).on('load', function(){
    $.ajax({
        url: '/check/login',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if(data.isLogin){
                const div_list = document.getElementsByTagName("div");
                const h1_element = document.getElementsByTagName("h1")[0];
                const remove_list = []
                for(let i = 0; i < div_list.length; i++){
                    remove_list.push(div_list[i])
                }
                remove_list.forEach(elem=>elem.remove());
                
                const a_element = document.createElement("a");
                a_element.href = "/profile";
                a_element.text = "프로필";
                h1_element.after(a_element);

            }
        }
    })
})

// function addElements(of, items) {

//     let stack = [];

//     for (const property in items) {
//         const div_element = document.createElement("div")
//         const span_element = document.createElement("span")
//         div_element.innerText = `${property}:::`
//         span_element.style = "color:yellow;background-color:red"
//         span_element.id = `${property}`
//         span_element.innerText = items[property]
//         stack.push(span_element)
//         stack.push(div_element)
//     }

//     of.after("<br><br>")

//     while (stack.length !== 0) {
//         const divElement = stack.pop();
//         divElement.append(stack.pop())
//         of.after(divElement)
//     }

//     stack = null;
// }