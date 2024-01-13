const blogElement = document.getElementById("blog-container");
let blogsRawData = [];
let LoadingTimeout = {};

const createBlogHTML = (blogs) => {
  const blogContentElement =
    blogs
      .slice(0, 5)
      .map((blog) => {
        return `<div class="flex flex-col md:flex-row gap-6 w-full">
    <img
      src="${blog.imageUrl}"
      alt="feature image 1"
      class="w-full md:w-auto"
    />
    <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
      <h3 class="text-2xl font-semibold">
        ${blog.title}
      </h3>
      <p class="text-xl font-light">
        ${blog.description}
      </p>
      <p>category : ${blog.category} </p>
      <p>At ${blog.publishedDate}</p>
      <a href="${blog.url}">Read more</a>
    </div>
    </div>
    `;
      })
      .join("") +
    `<h2 class="text-center readMore" onclick="expand()">See more</h2>`;

  blogElement.innerHTML = blogContentElement;
};

const expand = () => {
  console.log("expand");
  const blogContentElement = blogsRawData
    .map((blog) => {
      return `<div class="flex flex-col md:flex-row gap-6 w-full">
  <img
    src="${blog.imageUrl}"
    alt="feature image 1"
    class="w-full md:w-auto"
  />
  <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
    <h3 class="text-2xl font-semibold">
      ${blog.title}
    </h3>
    <p class="text-xl font-light">
      ${blog.description}
    </p>
    <p>category : ${blog.category} </p>
    <p>At ${blog.publishedDate}</p>
    <a href="${blog.url}">Read more</a>
  </div>
  </div>
  `;
    })
    .join("");
  blogElement.innerHTML = blogContentElement;
};

const searchBlogs = async (e) => {
  clearTimeout(LoadingTimeout);

  blogElement.innerHTML = `<h2 class = "">Loading...</h2>`;

  LoadingTimeout = setTimeout(() => {
    const filteredBlogs = blogsRawData.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(e.value.toLowerCase()) ||
        blog.description.toLowerCase().includes(e.value.toLowerCase()) ||
        blog.category.toLowerCase().includes(e.value.toLowerCase())
      );
    });

    createBlogHTML(filteredBlogs);
  }, 1000);
};

const sortBlogs = (e) => {
  const sortedBlog = blogsRawData.toSorted((a, b) => {
    let returnValue = new Date(a.publishedDate) - new Date(b.publishedDate);

    if (e.value === "desc") {
      returnValue = new Date(b.publishedDate) - new Date(a.publishedDate);
    }

    return returnValue;
  });

  createBlogHTML(sortedBlog);
};

const main = async () => {
  const response = await axios.get("/scripts/blogs.json");
  blogsRawData = response.data;

  createBlogHTML(blogsRawData);
};

main();
