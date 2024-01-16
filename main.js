/**
 * Unsplash API
 */
const img = document.getElementsByTagName('img');
const loader = document.getElementById('loader');
const imgContainer = document.getElementById('image-container');
let count = 5;
const apiKey = 'jY-egwwWJ2VyZkq6MOMLJZRwUV1ynbKidyL3FPzYPN0';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray = [];
let ready = false; 
let imageLoaded = 0; 
let totalImages = 0;


function imgLoaded() {
    imageLoaded++; 
    if (imageLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30; 
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}


// Render photosArray and link to the DOM 
// function randomPhoto() {
//     imageLoaded = 0;
//     totalImages = photosArray.length;
//     const html = photosArray.map((photo) => {
//         return `
//         <a href="${photo.links.html}" target="_blank">
//             <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}">
//         </a>
//         `;
//     });
//     imgContainer.innerHTML = html.join('');

//     imgContainer.addEventListener('load', imgLoaded);
// }


//Second way to get API -----------------------------------------------------------------------------------------------

//tao function setAttribute de rut gon code, khong de la code lap lai qua nhieu
function setAttribute(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}
function randomPhoto() {
    imageLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Tao the anchor <a>
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        })


        //Tao the img <img>
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', imgLoaded

        img.addEventListener('load', imgLoaded)


        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //<append child img vao a>
        item.appendChild(img);

        //<append child a vao container>
        imgContainer.appendChild(item)
    })
}



//Infinite Scroll
// If screen scroll to the bottom of the screen
function scrollToBottom() {
    //Co the lam gon nhung tach nho no ra

    //window.scrollY cho biet chieu cao dang o hien tai. Pixel dang keo
    const scrollPosisiton = window.scrollY;

    //innerHeight tra ve gia tri chieu cao noi dung cua Content
    const innerHeight = window.innerHeight;

    const scrollPositionToInnerHeight = scrollPosisiton + innerHeight;

    // Chieu cao thuc te cua trang web chua noi dung

    const contentHeight = document.body.offsetHeight - 1000;

    return scrollPositionToInnerHeight > contentHeight
}

//fetch more photos from API if the screen scroll to the bottom

async function getMorePhotos() {
    try {
        const response = await fetch(apiUrl);
        const newPhotos = await response.json();
        photosArray = [...photosArray, ...newPhotos];
        randomPhoto();
    } catch (err) {
        console.error('Error fetching photos:', err);
        // Handle error here
    }
}

window.onscroll = () => {
    if (scrollToBottom() && ready) {
        ready = false;
        getMorePhotos();
    }
}

// Get Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        if(response.status === 403) {
            console.error('Waiting for photos....');
            return;
        };
        photosArray = await response.json();
        randomPhoto();
    } catch (err) {
        console.error('Error fetching photos:', err);
        // Handle error here
    }
}

getPhotos();
