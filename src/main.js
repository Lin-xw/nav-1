const $siteList = $(".siteList"); //先找到siteList
const $lastLi = $siteList.find("li.last"); //然后再找到li.last然后插入
const a = localStorage.getItem("a");
const xObject = JSON.parse(a); //把字符串重新变成对象
const hashMap = xObject || [
    {logo: "A", url: "https://www.acfun.cn/",},
    {logo: "B", url: "https://www.bilibili.com/",},
    {logo: "C", url: "https://cc.163.com/",},
    {logo: "D", url: "https://www.douyu.com/",},
    {logo: "E", url: "https://egame.qq.com/",},
    {logo: "H", url: "https://www.huya.com/",}, 
];//哈希表

//删除添加网址的前后缀
const simplifyUrl = (url) => {
    return url
        .replace("https://", "")
        .replace("http://", "") //删掉https前缀
        .replace("www.", "")
        .replace(/\/.*/, ""); //删除/开头的内容
};

const render = () => {
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((node, index) => {//遍历
        //创建li
        const $li = $(`<li>
      <div class="sites">
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon" >
                <use xlink:href="#icon-shanchu"></use>
              </svg>
            </div>
        </div>
      </div>  
  </li>`).insertBefore($lastLi);
        $li.on("click", () => {
            window.open(node.url);
        });
        $li.on("click", ".close", (e) => {
            e.stopPropagation();//阻止冒泡
            hashMap.splice(index, 1)
            render()//删除用户指定的X卡片
        });
    });
};

render();

//网址添加当不填的时候触发
$(".addButton").on("click", () => {
    let url = window.prompt("请问需要添加的网址是?");
    if (url.indexOf("http") != 0) {
        url = "https://" + url;
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(), //改成第一个字母的大写
        url: url,
    });
    render();
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap); //把对象变成string
    localStorage.setItem("a", string);
};

$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})