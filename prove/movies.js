document.addEventListener("DOMContentLoaded", function() {


const articles = [
	{
		id: 1,
		title: 'Septimus Heap Book One: Magyk',
		date: 'July 5, 2022',
		description:
			'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
		imgAlt: 'Book cover for Septimus Heap 1',
		ages: '10-14',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		id: 2,
		title: 'Magnus Chase Book One: Sword of Summer',
		date: 'December 12, 2021',
		description:
			'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
		imgSrc:
			'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
		imgAlt: 'Book cover for Magnus Chase 1',
		ages: '12-16',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		id: 3,
		title: "Belgariad Book One: Pawn of Prophecy",
		date: "Feb 12, 2022",
		description:
		"A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
		imgSrc:
		"https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
		imgAlt: "Book cover for Pawn of Prophecy",
		ages: "12-16",
		genre: "Fantasy",
		stars: "⭐⭐⭐⭐⭐"
	}
];
                

  let movieList = document.querySelector("#movie-list")
		articles.forEach(movie => {
      
        let html = `<article class="book">
				<header class="details">
					<p><time datetime="2025-07-05">${movie.date}</time></p>
					<p>Age Range: ${movie.ages}</p>
					<p>Genre: Fantasy</p>
					<p aria-label="4 out of 5 stars" title="${movie.stars.length} out of 5 stars">${movie.stars}</p>
        </header>
				<div class="box-book">
					<h2 class="title">${movie.title}</h2>
					<img src=${movie.imgSrc} alt=${movie.imgAlt}>
					<p><strong>Release Date: </strong> ${movie.date}</p>
					<p><strong>Recommended Age: </strong>${movie.ages}</p>
					<p><strong>Genre: </strong>${movie.genre}</p>
					<p><strong>Rating: </strong> <span aria-label="${movie.stars.length} out
						of 5 stars" role="img">${movie.stars}</span></p>
					<p id='desc'>${movie.description}</p>
				</div>
      </article>`;

      movieList.innerHTML += html;

    })
});