const search = document.getElementById("Search-Button");
search.addEventListener("click", searchText = () => {
    let search_text = document.getElementById("Field-Searching").value;
    fetch(`https://openlibrary.org/search.json?q=${search_text}`)
    .then(res => res.json())
    .then(data=>show_data(data.docs));

    document.getElementById("Field-Searching").value = '';
    document.getElementById("output_div").innerText = '';
    document.getElementById("loader").style="display: block;";
    document.getElementById("not_found").style="display: none;";
    document.getElementById("CountTotalFound").style="display: none;";
});


const show_data = data => {
    document.getElementById("CountTotalFound").style="display: block;";
    document.getElementById("Search-Result").innerHTML = data.length;
    let increase = 0;
    if(data.length === 0){
        document.getElementById("CountTotalFound").style="display: none;";
        document.getElementById("not_found").style="display: block;";
    }
    else{
        data.forEach(element => {
            const img = element.cover_i;
            let author = element.author_name;
            if(author === undefined){
                author = 'Author Is  Not Found';
         }
          
            const div =  document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
            <div class="cards">
                <div class='image-div'>
                    <img id="thumbnail${increase}" src="https://covers.openlibrary.org/b/id/${img}-M.jpg" alt="Avatar" style="width:100%">
                </div>
                <div class="container">
                    <h2>${element.title}</h2>
                    <h4><b>${author}</b></h4> 
                    <p> First Publish : ${element.first_publish_year}</p>
                    <p> Publisher : ${element.publisher}</p>
                </div>
            </div>`;
            
            document.getElementById("output_div").appendChild(div);

            if(element.cover_i === undefined){
                const cover = document.getElementById(`thumbnail${increase}`);
                cover.src='cover.jpg';
            }
            increase++;
        });
    }
}