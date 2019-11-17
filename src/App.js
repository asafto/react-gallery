import React from 'react';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            images: []
        };
    }

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/albums`)
            .then(res => res.json())
            .then(albums => {
                this.setState({albums});
            });
    }

    getAlbumImages(e) {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${e.target.value}`)
            .then(res => res.json())
            .then(images => {
                this.setState({images});
        });
}

    render() {
        return (
            <div className="App">
              <h1>Select an album:</h1>
                <select onChange={this.getAlbumImages.bind(this)} className="albumSelectBox">
                    <option label="Select..." />
                    {this.state.albums.map(album => {
                        return <option className="albums-list" key={album.id} value={album.id}>{album.title}
                        </option>
                    })}
                </select>
                <hr/>
                <div className="album-images">
                    {this.state.images.map(image => {
                        return <a href={image.url}>
                            <img src={image.thumbnailUrl} alt={image.title} key={image.id} />
                        </a>
                    })}
                </div>
            </div>
        );
    }

}

export default App;
