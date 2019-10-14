 var fs = require("fs")
var request = require('request');
const cheerio = require('cheerio');

/**
 * 从 Keepalived 官网拉取 manpage.html，生成智能提示数据库
 */
function syncKeepalivedManpage() {

    console.log("请求网页 https://keepalived.org/manpage.html ");
    request('https://keepalived.org/manpage.html', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log('请求完成，准备写入文件。');

            fs.writeFile(`${__dirname}/keepalived-manpage.html`, body,  (err) => {
                if (err) {
                    console.log("写入文件失败！");
                    console.log(err);
                    return console.error(err);
                }

                console.log("写入文件成功！开始解析，生成智能提示数据库。");

                // eslint-disable-next-line no-unused-vars
                const $ = cheerio.load(body);

                //TODO：Generating keepalived-intellisense-db.json
            });
        }
    })
}

// eslint-disable-next-line no-unused-vars
module.exports = function(context, sync) {
    if(sync) {
        console.log('强制更新智能提示数据库')
        syncKeepalivedManpage()
        return
    }

    fs.exists(`${__dirname}/keepalived-manpage.html`, (exists) => {
        if(!exists) {
            syncKeepalivedManpage()
        } else {
            console.log('智能提示数据库已存在')
        }
    })
};
