// write your code here
const menu = document.querySelector('#ramen-menu')
const update=  document.querySelector('form#ramen-rating')
const newform = document.querySelector('form#new-ramen')
const deletebtn=document.querySelector('button.delete')
function oneRamen(ramen)
{
    const detailimg = document.querySelector('img.detail-image')
    detailimg.src = ramen.image

    const h2= document.querySelector('h2.name')
    h2.textContent = ramen.name

    const h3= document.querySelector('h3.restaurant')
    h3.textContent = ramen.restaurant

    update.dataset.id = ramen.id
    const rating = update.querySelector('input#rating')
    rating.value = ramen.rating
    const comment = update.querySelector('#comment')
    comment.value = ramen.comment
}

function renderoneRamen(ramen){
    const ramenimg= document.createElement('img')
    ramenimg.src = ramen.image
    ramenimg.dataset.id = ramen.id
    menu.append(ramenimg)
}

function renderAllRamen(){
    fetch('http://localhost:3000/ramens')
        .then(r => r.json())
        .then(ramens => {
            menu.innerHTML = ''
            oneRamen(ramens[0])

            ramens.forEach(ramen => {
                renderoneRamen(ramen)
            })
        })
}
menu.addEventListener('click', event=>{
    if (event.target.matches('img')){
        const id = event.target.dataset.id
    fetch('http://localhost:3000/ramens/' + id)
        .then(r => r.json())
        .then(ramen => {
            oneRamen(ramen)
        })
    }
})

update.addEventListener('submit', e=>{
    e.preventDefault()
    const rating=e.target[0].value
    const comment= e.target[1].value
    fetch ('http://localhost:3000/ramens/' + e.target.dataset.id,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({rating, comment })
    })
    .then (r=>r.json())
    .then(updateRamen=>{
        
    })
})

newform.addEventListener('submit', e=>{
    e.preventDefault()

    const name = e.target[0].value
    const restaurant= e.target.restaurant.value
    const image = e.target.image.value
    const rating = e.target.rating.value
    const comment = e.target[4].value

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, restaurant, image, rating, comment })
    })
        .then(r => r.json())
        .then(newRamen => {
            oneRamen(newRamen)
            renderoneRamen(newRamen)
            e.target.reset()
        })
})
deletebtn.addEventListener('click',e=>{
    const id = e.target.parentElement.dataset.id

    fetch('http://localhost:3000/ramens/' + id,{
    method: 'DELETE'
    })
    .then(r=> r.json())
    .then(()=>{
        renderAllRamen()
    })

})

renderAllRamen()
