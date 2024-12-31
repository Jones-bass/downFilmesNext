/* eslint-disable prettier/prettier */

import { prisma } from "@/app/lib/prisma"

async function seed() {
  const movies = [
    {
      title: "Avatar",
      year: "2009",
      runtime: "162 min",
      genre: "Action, Adventure, Fantasy",
      director: "James Cameron",
      writer: "James Cameron",
      actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
      description: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      language: "English, Spanish",
      country: "USA, UK",
      image: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/b0/Avatar-Teaser-Poster.jpg/250px-Avatar-Teaser-Poster.jpg",
      imdbRating: "7.9",
      type: "movie",
    },
    {
      title: "I Am Legend",
      year: "2007",
      runtime: "101 min",
      genre: "Drama, Horror, Sci-Fi",
      director: "Francis Lawrence",
      writer: "Mark Protosevich (screenplay), Akiva Goldsman (screenplay), Richard Matheson (novel), John William Corrington, Joyce Hooper Corrington",
      actors: "Will Smith, Alice Braga, Charlie Tahan, Salli Richardson-Whitfield",
      description: "years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.",
      language: "English",
      country: "USA",
      image: "https://zfilez.wordpress.com/wp-content/uploads/2012/10/i-am-legend.jpg",
      imdbRating: "7.2",
      type: "movie",
    },
    {
      title: "The Avengers",
      year: "2012",
      runtime: "143 min",
      genre: "Action, Sci-Fi, Thriller",
      director: "Joss Whedon",
      writer: "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
      actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
      description: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
      language: "English, Russian",
      country: "USA",
      image: "https://br.web.img3.acsta.net/pictures/19/04/26/17/30/2428965.jpg",
      imdbRating: "8.1",
      type: "movie",
    },  
    {
      title: "The Wolf of Wall Street",
      year: "2013",
      runtime: "180 min",
      genre: "Biography, Comedy, Crime",
      director: "Martin Scorsese",
      writer: "Terence Winter (screenplay), Jordan Belfort (book)",
      actors: "Leonardo DiCaprio, Jonah Hill, Margot Robbie, Matthew McConaughey",
      description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
      language: "English, French",
      country: "USA",
      image: "https://m.media-amazon.com/images/I/91m2MB2lYFL._AC_UF894,1000_QL80_.jpg",
      imdbRating: "8.2",
      type: "movie",
    },
    {
      title: "Interstellar",
      year: "2014",
      runtime: "169 min",
      genre: "Adventure, Drama, Sci-Fi",
      director: "Christopher Nolan",
      writer: "Jonathan Nolan, Christopher Nolan",
      actors: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      language: "English",
      country: "USA, UK",
      image: "https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png",
      imdbRating: "8.6",
      type: "movie",
    },
    {
      title: "Game of Thrones",
      year: "2011",
      runtime: "56 min",
      genre: "Adventure, Drama, Fantasy",
      director: "N/A",
      actors: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
      writer: "Daver Dinklage, Lena Headey, Emilia Clarke, Kit Harington",
      description: "While a civil war brews between several noble families in Westeros, the children of the former rulers of the land attempt to rise up to power. Meanwhile a forgotten race, bent on destruction, plans to return after thousands of years in the North.",
      language: "English",
      country: "USA, UK",
      image: "https://media.fstatic.com/W5NYheYAWGpjjKNzJ_2FEan6bXo=/322x478/smart/filters:format(webp)/media/movies/covers/2011/06/5382327a6cb89f363da30c93a2358013.jpg",
      imdbRating: "9.5",
      type: "series",
    },
    {
      title: "Vikings",
      year: "2013",
      runtime: "44 min",
      genre: "Action, Drama, History",
      director: "N/A",
      writer: "Michael Hirst",
      actors: "Travis Fimmel, Clive Standen, Gustaf Skarsgård, Katheryn Winnick",
      description: "The world of the Vikings is brought to life through the journey of Ragnar Lothbrok, the first Viking to emerge from Norse legend and onto the pages of history - a man on the edge of myth.",
      language: "English, Old English, Norse, Old, Latin",
      country: "Ireland, Canada",
      image: "https://www.papodecinema.com.br/wp-content/uploads/2021/02/20210211-viking-papo-de-cinema-cartaz.jpg",
      imdbRating: "8.6",
      type: "series",
    },
    {
      title: "Gotham",
      year: "2014",
      runtime: "42 min",
      genre: "Action, Crime, Drama",
      director: "N/A",
      description: "Gotham é uma série de televisão americana criada por Bruno Heller, baseada em personagens que aparecem em publicações da DC Comics em sua franquia Batman, principalmente o Detetive James Gordon e Bruce Wayne. A série é estrelada por Ben McKenzie como o jovem Gordon.",
      writer: "Bruno Heller",
      actors: "Ben McKenzie, Donal Logue, Dave James Gordon's rise to prominence in Gotham City in the years before Batman's arrival.",
      language: "English",
      country: "USA",
      image: "https://media.fstatic.com/X-khhSlQwh2roBfZZcfisbKl1wE=/322x478/smart/filters:format(webp)/media/movies/covers/2015/08/gotham-2a-temporada_t111689.jpg",
      imdbRating: "8.0",
      type: "series",
    },
    {
      title: "Power",
      year: "2014",
      runtime: "50 min",
      genre: "Crime, Drama",
      director: "N/A",
      writer: "Courtney Kemp Agboh",
      actors: "Omari Hardwick, Joseph Sikora, Andy Bean, Lela Loren",
      description: "James \"Ghost\" St. Patrick, a wealthy New York night club owner who has it all, catering for the city's elite and dreaming big, lives a double life as a drug kingpin.",
      language: "English",
      country: "USA",
      image: "https://br.web.img3.acsta.net/pictures/20/07/15/19/21/4865389.jpg",
      imdbRating: "8.0",
      type: "series",
    },
    {
      title: "Narcos",
      year: "2015",
      runtime: "49 min",
      genre: "Biography, Crime, Drama",
      director: "N/A",
      writer: "Carlo Bernard, Chris Brancato, Doug Miro, Paul Eckstein",
      actors: "Wagner Moura, Boyd Holbrook, Pedro Pascal, Joanna Christie",
      description: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.",
      language: "English, Spanish",
      country: "USA",
      image: "https://i0.wp.com/jornalcomunicacao.ufpr.br/wp-content/uploads/2015/09/21939810.jpg?ssl=1",
      imdbRating: "8.9",
      type: "series",
    },
    {
      title: "Breaking Bad",
      year: "2008",
      runtime: "49 min",
      genre: "Crime, Drama, Thriller",
      director: "N/A",
      writer: "Vince Gilligan",
      actors: "Bryan Cranston, Anna Gunn, Aaron Paul, Dean Norris",
      description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's financial future.",
      language: "English, Spanish",
      country: "USA",
      image: "https://upload.wikimedia.org/wikipedia/pt/4/48/El_Camino_p%C3%B4ster.png",
      imdbRating: "9.5",
      type: "series",
    },
    {
      title: "Doctor Strange",
      year: "2016",
      runtime: "N/A",
      genre: "Action, Adventure, Fantasy",
      director: "Scott Derrickson",
      writer: "Scott Derrickson (screenplay), C. Robert Cargill (screenplay), Jon Spaihts (story by), Scott Derrickson (story by), C. Robert Cargill (story by), Steve Ditko (comic book)",
      actors: "Rachel McAdams, Benedict Cumberbatch, Mads Mikkelsen, Tilda Swinton",
      description: "After his career is destroyed, a brilliant but arrogant and conceited surgeon gets a new lease on life when a sorcerer takes him under her wing and trains him to defend the world against evil.",
      language: "English",
      country: "USA",
      image: "https://play-lh.googleusercontent.com/XpxmsyAicsUv1VQXPWTStd3XgAdjNOB2ma7gQup9aKsV5rkZFdiZB7jB31YOqBum_kLW3AiMvtWMTzF5nw",
      imdbRating: "N/A",
      type: "movie",
    },
    {
      title: "Rogue One: A Star Wars Story",
      year: "2016",
      runtime: "N/A",
      genre: "Action, Adventure, Sci-Fi",
      director: "Gareth Edwards",
      writer: "Chris Weitz (screenplay), Tony Gilroy (screenplay), John Knoll (story), Gary Whitta (story), George Lucas (characters)",
      actors: "Felicity Jones, Riz Ahmed, Mads Mikkelsen, Ben Mendelsohn",
      description: "The Rebellion makes a risky move to steal the plans to the Death Star, setting up the epic saga to follow.",
      language: "English",
      country: "USA",
      image: "https://images.justwatch.com/poster/176342492/s166/rogue-one-a-star-wars-story",
      imdbRating: "N/A",
      type: "movie",
    },
    {
      title: "Assassin's Creed",
      year: "2016",
      runtime: "N/A",
      genre: "Action, Adventure, Fantasy",
      director: "Justin Kurzel",
      writer: "Bill Collage (screenplay), Adam Cooper (screenplay), Michael Lesslie (screenplay)",
      actors: "Michael Fassbender, Michael Kenneth Williams, Marion Cotillard, Jeremy Irons",
      description: "When Callum Lynch explores the memories of his ancestor Aguilar and gains the skills of a Master Assassin, he discovers he is a descendant of the secret Assassins society.",
      language: "English",
      country: "UK, France, USA, Hong Kong",
      image: "https://static.wikia.nocookie.net/assassinscreedbr/images/b/ba/Capa_de_Assassin%27s_Creed_Livro_Oficial_do_Filme.jpg/revision/latest?cb=20161207185326&path-prefix=pt",
      imdbRating: "N/A",
      type: "movie",
    },
    {
      title: "Luke Cage",
      year: "2016",
      runtime: "55 min",
      genre: "Action, Crime, Drama",
      director: "N/A",
      writer: "Cheo Hodari Coker",
      actors: "Mahershala Ali, Mike Colter, Frankie Faison, Erik LaRay Harvey",
      description: "Given superstrength and durability by a sabotaged experiment, a wrongly accused man escapes prison to become a superhero for hire.",
      language: "English",
      country: "USA",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiQDOfhkVdoTZjDXMPKI-x85P-1Ggt6eAT4w&s",
      imdbRating: "N/A",
      type: "series",
    }
  ]
  
  for (const movie of movies) {
    await prisma.movie.upsert({
      where: { title: movie.title },
      update: movie,
      create: movie 
    })
  }
  console.log('All movies created')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// comando npx prisma db seed
