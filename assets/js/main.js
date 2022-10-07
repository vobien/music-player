const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");
const header = $("header h1");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progressBar = $("#progress");
const btnNext = $(".btn-next");
const btnPrev = $(".btn-prev");
const btnRandom = $(".btn-random");
const btnRepeat = $(".btn-repeat");
const playlist = $(".playlist");

const PLAYER_STORAGE_KEY = "music-player";

const app = {
  currentSongIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  configs: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      title: "Em Sẽ Không Về (New Version)",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/3/8/7/e/387edfa784e46725288859f6ded1a823.jpg",
      artistsNames: "Trịnh Thiên Ân",
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/32ec3c32a875412b1864/4551483886532413825?authen=exp=1665219819~acl=/32ec3c32a875412b1864/*~hmac=a756f9b15c024f3060319962a5d16b02",
    },
    {
      title: "Tết Này Con Không Về",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/9/6/2/c9623744539742cea19f8f96abaab602.jpg",
      artistsNames: "Thanh Hưng",
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/82d90e759a32736c2a23/3413114817655026454?authen=exp=1665219878~acl=/82d90e759a32736c2a23/*~hmac=4d00ec845341964c0c792821c3d2b13c",
    },
    {
      title: "Kết Thúc Lưng Chừng",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/2/7/b/e27b1ce4f147d7afd81b527986067413.jpg",
      artistsNames: "Văn Võ Ngọc Nhân",
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/4314947b203cc962902d/607687347873116021?authen=exp=1665219625~acl=/4314947b203cc962902d/*~hmac=bc38df9b93b5c7b342a2566a86e1319f",
    },
    {
      title: "Tòng Phu",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/d/f/9/b/df9b187a2b0e565ebe5b6bd60bdef622.jpg",
      artistsNames: "Keyo",
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/fac48e06b2465b180257/1072001800942752349?authen=exp=1665219431~acl=/fac48e06b2465b180257/*~hmac=5780ba89ed157c742f7e63c2cc02e220",
    },
    {
      title: "Lạc Chốn Hồng Trần",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/3/2/2/432286bb7b63a0c4e91b2779d46de7f8.jpg",
      artistsNames: "Lã Phong Lâm",
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/bf5ad30365428c1cd553/7056453798810864771?authen=exp=1665219935~acl=/bf5ad30365428c1cd553/*~hmac=b6669b0535ae228ea6b0db00be25c2f9",
    },
    {
      title: "Hẹn Yêu",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/f/f/4/a/ff4ac76952eb79b4ed30da40dd727a4d.jpg",
      artistsNames: "Minh Vương M4U, Thương Võ, ACV",
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/e5c5ec78793f9061c92e/4175347926341844524?authen=exp=1665279583~acl=/e5c5ec78793f9061c92e/*~hmac=af492fecdfe92c27e4ab52f7e617a48a",
    },
    {
      title: "Thiên Bồng Tình Truyện",
      artistsNames: "Chung Thanh Duy",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/1/4/4/4144003e6fa48e457d48453c13b56ad4.jpg",
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/1f8151c8c58f2cd1759e/269957962165894898?authen=exp=1665279631~acl=/1f8151c8c58f2cd1759e/*~hmac=4cb4e6c46507330c19f45158e96d3e47",
    },
    {
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/0e9b481e585eb100e84f/1135141909293492852?authen=exp=1665279457~acl=/0e9b481e585eb100e84f/*~hmac=cb00b61bc3434228a36a35d08e88fe62",
      title: "Tiếng Pháo Tiễn Người",
      artistsNames: "Hùng Quân",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/b/7/8/5/b7853b339822edbda2293f9dd9177118.jpg",
    },
    {
      title: "Chắc Vì Mình Chưa Tốt",
      artistsNames: "Thanh Hưng",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/f/e/e/b/feebaec84a211ff8c46a2d803f7a646c.jpg",
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/dd25067d6a3a8364da2b/19587538280384586?authen=exp=1665279737~acl=/dd25067d6a3a8364da2b/*~hmac=847a60f3cabf7f197216cb89f56cf446",
    },
    {
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/03524bb97ef997a7cee8/8142852633755061174?authen=exp=1665279696~acl=/03524bb97ef997a7cee8/*~hmac=59ded66ce1bd904381de946573f36786",
      title: "Đủ Trải Sẽ Thấm",
      artistsNames: "Mike, Chiennhatlang",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/5/2/b/6/52b6699960d093dac6c5d8ce9644f95e.jpg",
    },
    {
      url: "https://mp3-s1-m-zmp3.zmdcdn.me/cecffcfa2fbbc6e59faa/4515226719688389453?authen=exp=1665279582~acl=/cecffcfa2fbbc6e59faa/*~hmac=6403e057bb66ace552922e354d00a0bd",
      title: "Ngày Mai Em Đi Mất",
      artistsNames: "Khải Đăng, Đạt G",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/9/8/6/c/986ccfe2a965e11b4c967745a0fefe96.jpg",
    },
  ],
  setConfigs(configs) {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(configs));
  },
  loadConfigs() {
    this.isRepeat = this.configs.isRepeat || false;
    this.isRandom = this.configs.isRandom || false;
  },
  defineProperties() {
    Object.defineProperty(this, "currentSong", {
      get() {
        return this.songs[this.currentSongIndex];
      },
    });
  },
  render() {
    const htmls = this.songs.map((song, id) => {
      const { title, thumbnail, artistsNames } = song;
      return `
            <div class="song ${
              id === this.currentSongIndex ? "active" : ""
            }" key=${id}>
                <div class="thumb" style="background-image: url('${thumbnail}');"></div>
                <div class="body">
                    <h3 class="title">${title}</h3>
                    <p class="author">${artistsNames}</p>
                </div>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        `;
    });

    $(".playlist").innerHTML = htmls.join("");
  },
  handleActiveSong(oldActiveSong, newActiveSong) {
    const newActiveSongElement = $(`.song[key='${newActiveSong}']`);
    const oldActiveSongElement = $(`.song[key='${oldActiveSong}']`);

    oldActiveSongElement.classList.remove("active");
    newActiveSongElement.classList.add("active");
  },
  handleEvents() {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // add event handler for btn repeat
    btnRepeat.onclick = function () {
      _this.isRepeat = !_this.isRepeat;

      // set config to local storage
      _this.configs["isRepeat"] = _this.isRepeat;
      _this.setConfigs(_this.configs);

      btnRepeat.classList.toggle("active", _this.isRepeat);
    };

    // add event handler for btn next
    btnNext.onclick = function () {
      const oldActiveSong = _this.currentSongIndex;

      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }

      audio.play();
      _this.handleActiveSong(oldActiveSong, _this.currentSongIndex);
      _this.scrollToActiveSong();
    };

    // add event handle for btn next
    btnPrev.onclick = function () {
      const oldActiveSong = _this.currentSongIndex;

      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }

      audio.play();
      _this.handleActiveSong(oldActiveSong, _this.currentSongIndex);
      _this.scrollToActiveSong();
    };

    // click random song
    btnRandom.onclick = function () {
      _this.isRandom = !_this.isRandom;

      // set config to local storage
      _this.configs["isRandom"] = _this.isRandom;
      _this.setConfigs(_this.configs);

      btnRandom.classList.toggle("active", _this.isRandom);
    };

    // rotate cd
    const cdAnimation = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdAnimation.pause();

    // scroll playlist to zoom in/out the cd
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // click play the current song
    playBtn.onclick = function () {
      if (_this.isPlaying === true) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // handle event audio onPlay
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdAnimation.play();
    };

    // handle event audio onPause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdAnimation.pause();
    };

    // handle event tracking time
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
      }
    };

    // handle auto next mp3
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        btnNext.click();
      }
    };

    // handle seek on progress bar
    progressBar.onchange = function (e) {
      const seekTime = (e.target.value * audio.duration) / 100;
      audio.currentTime = seekTime;
    };

    // handle click on song
    playlist.onclick = function (e) {
      const song = e.target.closest(".song:not(.active)");
      if (song) {
        const oldActiveSong = _this.currentSongIndex;
        _this.currentSongIndex = song.getAttribute("key");
        _this.loadCurrentSong();
        _this.handleActiveSong(oldActiveSong, _this.currentSongIndex);
        audio.play();
      }

      if (e.target.closest(".option")) {
        console.log("Open Settings");
      }
    };
  },
  loadCurrentSong() {
    const { title, thumbnail, url } = this.currentSong;
    header.textContent = title;
    cdThumb.style.backgroundImage = `url('${thumbnail}')`;
    audio.src = url;
  },
  nextSong() {
    this.currentSongIndex++;
    if (this.currentSongIndex >= this.songs.length) {
      this.currentSongIndex = 0;
    }

    this.loadCurrentSong();
  },
  prevSong() {
    this.currentSongIndex--;
    if (this.currentSongIndex <= 0) {
      this.currentSongIndex = 0;
      btnPrev.classList.add("disable");
    }

    this.loadCurrentSong();
  },
  randomSong() {
    let randomIndex = 0;
    do {
      randomIndex = Math.round(Math.random() * (this.songs.length - 1));
    } while (randomIndex === this.currentSongIndex);

    this.currentSongIndex = randomIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong() {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 500);
  },
  start() {
    this.loadConfigs();
    console.log(this.configs, this.isRandom);
    btnRandom.classList.toggle("active", this.isRandom);
    btnRepeat.classList.toggle("active", this.isRepeat);

    this.defineProperties();

    this.handleEvents();

    // load the first song
    this.loadCurrentSong();

    // render playlist
    this.render();
  },
};

app.start();
