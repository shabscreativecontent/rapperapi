const delRap = document.querySelectorAll('.delete')
const upLike = document.querySelectorAll('.like')
const completedItem = document.querySelectorAll('.rap span')
const unCompletedItem = document.querySelectorAll('.rap span.completed')


Array.from(delRap).forEach(element => {
   element.addEventListener('click', deleteRapper)
})

async function deleteRapper(){
   const rapN = this.parentNode.childNodes[1].innerText
   const rapF = this.parentNode.childNodes[3].innerText

   try{
      const response = await fetch("deleteRapper", {
         method: 'delete',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            'rapNameS': rapN,
            'rapFoodS': rapF
         })
      })

      const data = await response.json()
      console.log(data)
      location.reload()
   }catch(error){
      console.error(error);
   }
}

Array.from(upLike).forEach(element => element.addEventListener('click', updateLike))

async function updateLike(){
   const rapN = this.parentNode.childNodes[1].innerText
   const rapF = this.parentNode.childNodes[3].innerText
   const rapL = this.parentNode.childNodes[5].innerText

   try{
      const response = await fetch('updateLike', {
         method: 'put',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            'rapNameS': rapN,
            "rapFoodS": rapF,
            'rapLikeS': rapL
         })
      })

      const data = await response.json()
      console.log(data);
      location.reload()
   }catch(error){
      console.error(error);
   }
}

Array.from(completedItem).forEach(element => element.addEventListener('click', completed))




