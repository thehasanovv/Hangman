var wordList = {
    radiohead: {
        picture: "radiohead.jpg",
        genres: 'Art rock, alternative rock, electronic, aexperimental rock',
        years_active: '1985–present',
        members: `
            Thom Yorke,
            Jonny Greenwood,
            Colin Greenwood,
            Ed O'Brien,
            Philip Selway,`,
        preview: "https://p.scdn.co/mp3-preview/b84f24300476f3d3f20056d2388cc51db2e3891f"
    },
    // poison: {
    //     picture: "poison.jpg",
    //     genres: "Fallen Angel",
    //     preview: "https://p.scdn.co/mp3-preview/0365ad1f152f1834b42b857c4625191cebf9f987"
    // },
    // queen: {
    //     picture: "rush.jpg",
    //     song: "Limelight",
    //     preview: "https://p.scdn.co/mp3-preview/154987dfb07f2fc5ed7aa4d76b80c5dc08ff4d6b"
    // },
    // blondie: {
    //     picture: "blondie.jpg",
    //     song: "Call Me",
    //     preview: "https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90"
    // }
}

let selectedWord2 = Object.entries(wordList)[Math.floor(Math.random() * Object.keys(wordList).length)]

console.log(selectedWord2)
console.log(selectedWord2[0])
console.log(selectedWord2[1].genres)
console.log(selectedWord2[1].members)

// console.log(Object.entries(wordList))

// console.log(Object.entries(wordList)[0][1]['genres'])
// console.log(Object.entries(wordList).selectedWord2)