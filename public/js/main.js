const message = document.querySelector("#message");
const message2 = document.querySelector("#message2");

message.onclick = () => {
  alert("You Are not Allowed, Please try Again");
};
message2.onclick = () => {
  alert("You Are not Allowed, Please try Again");
};
const descriptionElement = document.querySelector(".description");

const description = descriptionElement.innerHTML;

const words = description.split(" ");

const maxWords = 40;
const shortDescription = words.slice(0, maxWords).join(" ");

const link = document.createElement("a");
const text = document.createTextNode("read more");
link.appendChild(text);
link.href = "#readmore";

link.addEventListener("click", (e) => {
  e.preventDefault();
  const maxWords = description.length;
  const shortDescription = words.slice(0, maxWords).join(" ");
  descriptionElement.innerHTML = shortDescription;
});

descriptionElement.innerHTML = shortDescription + "... ";
descriptionElement.appendChild(link);
