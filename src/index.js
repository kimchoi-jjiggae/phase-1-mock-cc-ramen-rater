// write your code here
let ramenMenu = document.getElementById("ramen-menu")
let ramenDetail = document.getElementById("ramen-detail")
let addForm = document.getElementById("new-ramen")
let editForm = document.getElementById("edit-ramen")

document.addEventListener("DOMContentLoaded", e =>
{
        fetch("http://localhost:3000/ramens")
            .then(res=> res.json())
            .then(data => {
                data.forEach((ramen) =>{
                    renderRamen(ramen)
                    featureRamen(ramen)
            })
                featureRamen(data[0])
            })
})

function renderRamen(ramen){
    let ramenItem = document.createElement('img')
    ramenItem.src = ramen.image
    ramenMenu.append(ramenItem)
    ramenItem.addEventListener("click", e=> featureRamen(ramen))

}

function featureRamen(ramen){
    ramenDetail.getElementsByClassName("detail-image")[0].src = ramen.image
    ramenDetail.getElementsByClassName("name")[0].innerText = ramen.name
    ramenDetail.getElementsByClassName("restaurant")[0].innerText = ramen.restaurant
    ramenDetail.className = ramen.id
    document.getElementById('rating-display').innerText = ramen.rating
    document.getElementById('comment-display').innerText = ramen.comment
}

addForm.addEventListener("submit", e=> {
    e.preventDefault()
    object = {}
    object['name'] = document.getElementById('new-name').value
    object['restaurant'] = document.getElementById('new-restaurant').value
    object['image'] = document.getElementById('new-image').value
    object['rating'] = document.getElementById('new-rating').value
    object['comment'] = document.getElementById('new-comment').value
    console.log(object)

    fetch('http://localhost:3000/ramens', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(object)
    })
      .then(res=> res.json())
      .then(data => 
        {
            window.location.reload()
            // renderRamen(data, data.id)
            // featureRamen(data)
            // form.reset()
        })
})

editForm.addEventListener("submit", e=> {
    e.preventDefault()
    object = {}
    object['rating'] = document.getElementById('edited-rating').value
    object['comment'] = document.getElementById('edited-comment').value
    console.log(object)
    id = ramenDetail.classList[0]

    fetch(`http://localhost:3000/ramens/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(object)
    })
      .then(res=> res.json())
      .then(data => 
        {
            window.location.reload()
            // featureRamen(data)
        })
})

document.getElementById('delete').addEventListener("click", e=>
{
    id = ramenDetail.classList[0]

    fetch(`http://localhost:3000/ramens/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
    })
    .then(res=>res.json())
    .then(window.location.reload())
})