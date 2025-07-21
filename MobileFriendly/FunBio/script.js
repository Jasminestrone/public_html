document.addEventListener('DOMContentLoaded', function () {
    const titleText = 'Jasmine ♡ Jasmine ♡ Jasmine ♡ ';
    let index = 0;

    setInterval(() => {
        document.title = titleText.substring(index, titleText.length) + titleText.substring(0, index);
        index = (index + 1) % titleText.length;
    }, 250);

    const typedUsername = '@Jasmine';
    let charIndexUsername = 0;
    const usernameContainer = document.getElementById('username');
    usernameContainer.classList.add('typing-container');

    function typeUsername() {
        if (charIndexUsername < typedUsername.length) {
            usernameContainer.textContent += typedUsername.charAt(charIndexUsername);
            charIndexUsername++;
            setTimeout(typeUsername, 100);
        } else {
            usernameContainer.classList.remove('typing-container');
        }
    }

    const typedSillyBilly = 'Silliest Billy';
    let charIndexSillyBilly = 0;
    const sillyBillyContainer = document.getElementById('silly-billy');
    sillyBillyContainer.classList.add('typing-container');

    function typeSillyBilly() {
        if (charIndexSillyBilly < typedSillyBilly.length) {
            sillyBillyContainer.textContent += typedSillyBilly.charAt(charIndexSillyBilly);
            charIndexSillyBilly++;
            setTimeout(typeSillyBilly, 100);
        } else {
            sillyBillyContainer.classList.remove('typing-container');
        }
    }

    // Attach click event to entire page
    document.addEventListener('click', function () {
        const gif = document.getElementById('background-gif');
        gif.classList.remove('hidden');
        document.getElementById('profile-card').classList.remove('hidden');
        document.getElementById('gradient-background').classList.add('hidden');

        const audioPlayer = document.getElementById('audio-player');
        const playPauseButton = document.getElementById('play-pause-button');
        audioPlayer.volume = 0.2;
        audioPlayer.play();
        playPauseButton.textContent = '❚❚';

        // Trigger typing effect after click
        typeUsername();
        typeSillyBilly();
    }, { once: true });

    // Mouse trail effect
    document.addEventListener('mousemove', e => {
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        cursorTrail.style.left = `${e.pageX}px`;
        cursorTrail.style.top = `${e.pageY}px`;
        document.getElementById('cursor-trail-container').appendChild(cursorTrail);
        setTimeout(() => {
            cursorTrail.remove();
        }, 200);
    });

    // Music player functionality
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volumeButton = document.getElementById('volume-button');

    playPauseButton.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = '❚❚';
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = '▶';
        }
    });

    audioPlayer.addEventListener('timeupdate', function () {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        progressBar.value = (currentTime / duration) * 100;
        currentTimeSpan.textContent = formatTime(currentTime);
        durationSpan.textContent = formatTime(duration);
    });

    progressBar.addEventListener('input', function () {
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (progressBar.value / 100) * duration;
    });

    volumeButton.addEventListener('click', function () {
        audioPlayer.muted = !audioPlayer.muted;
        volumeButton.textContent = audioPlayer.muted ? '🔇' : '🔊';
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
});