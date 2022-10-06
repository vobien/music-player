const url =
  "https://zingmp3.vn/api/v2/page/get/playlist?id=ZWZB96A9&thumbSize=600_600&ctime=1665015881&version=1.7.36&sig=ac6d82930dc6bdcce8e80ecd846abfa891cf799309e3b848a5e248150e58d51590d1398cc157580dc43cfe48562848c2b09ede458bc5b4fdbe981d91b61f5be9&apiKey=X5BM3w8N7MKozC0B85o4KMlzLZKhV00y";

const options = {
  method: "GET",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
};

fetch(url, options)
  .then((response) => {
    console.log(response);
    console.log(response.json());
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
