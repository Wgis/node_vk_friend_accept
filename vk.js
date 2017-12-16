const vkapi = new (require('node-vkapi'))({ accessToken: '' });
const delay = 8 // Задержка в секундах, лучше больше, но медленей

function CatchError(err){
	console.error(err);
	process.exit();
}

function AddPeople(id){
	 vkapi.call('friends.add', {
	  user_id: id,
	  follow:   '0',
	  v: '5.69' 
	})
  .then(user => console.log('Добавил: '+id))
  .catch(error => CatchError(error))	
};

function AddPeoples(ppls){
	if (ppls.count <= 0){ process.exit() }
	console.log("Найдено: "+(ppls.count-1))
	ppls.items.forEach(function(id,index) {
		setTimeout(function(){
			console.log("["+index+"/"+(ppls.items.length-1)+"] : "+id);
			AddPeople(id);
			if (index === ppls.items.length-1){ 
				console.log("Всех добавил, выхожу ");
				process.exit();
			};
        },
        delay*1000*index);		
	});
	
}

 vkapi.call('friends.getRequests', {
  extended: '0',
  need_mutual:   '0',
  out: '0',
  need_viewed: '0',
  suggested: '0',
  v: '5.69'
})
  .then(users => AddPeoples(users))
  .catch(error => CatchError(error)) 
 