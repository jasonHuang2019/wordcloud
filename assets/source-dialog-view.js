'use strict';

/* global View */

var SourceDialogView = function SourceDialogView(opts) {
  this.load(opts, {
    name: 'source-dialog',
    element: 'wc-source-dialog',
    menuElement: 'wc-source-menu',
    selectionElement: 'wc-source-selection',
    startBtnElement: 'wc-source-start-btn',
    cancelBtnElement: 'wc-source-cancel-btn',
    panelContainerElement: 'wc-source-panels',
    aboutBtnElement: 'wc-source-about-btn'
  });

  this.currentPanel = null;
  this.panels = {};
  var selectionElement = this.selectionElement;
  var menuLinks = this.menuElement.getElementsByTagName('a');
  Array.prototype.forEach.call(menuLinks, function item(el) {
    var option = document.createElement('option');
    option.value = el.getAttribute('data-panel');
    option.setAttribute('data-l10n-id', el.getAttribute('data-l10n-id'));
    option.appendChild(document.createTextNode(el.textContent));
    selectionElement.appendChild(option);
  });

  this.menuElement.addEventListener('click', this);
  this.selectionElement.addEventListener('change', this);
  this.startBtnElement.addEventListener('click', this);
  this.cancelBtnElement.addEventListener('click', this);
  this.panelContainerElement.addEventListener('submit', this);
  this.aboutBtnElement.addEventListener('click', this);
  
  //-----------Generate default words------------//
  // var initWords = ['12 Love'];
      // var nums = [5, 4, 3, 2, 2];
      // // This list of the word "Love" in language of the world was taken from
      // // the Language links of entry "Love" in English Wikipedia, with duplicate
      // // spelling removed.
      // var words = ('Liebe,ፍቅር,Lufu,حب,Aimor,Amor,Heyran,ভালোবাসা,Каханне,Любоў,Любов,བརྩེ་དུང་།,' +
        // 'Ljubav,Karantez,Юрату,Láska,Amore,Cariad,Kærlighed,Armastus,Αγάπη,Amo,Amol,Maitasun,' +
        // 'عشق,Pyar,Amour,Leafde,Gràdh,愛,爱,પ્રેમ,사랑,Սեր,Ihunanya,Cinta,ᑕᑯᑦᓱᒍᓱᑉᐳᖅ,Ást,אהבה,' +
        // 'ಪ್ರೀತಿ,სიყვარული,Махаббат,Pendo,Сүйүү,Mīlestība,Meilė,Leefde,Bolingo,Szerelem,' +
        // 'Љубов,സ്നേഹം,Imħabba,प्रेम,Ái,Хайр,အချစ်,Tlazohtiliztli,Liefde,माया,मतिना,' +
        // 'Kjærlighet,Kjærleik,ପ୍ରେମ,Sevgi,ਪਿਆਰ,پیار,Miłość,Leevde,Dragoste,' +
        // 'Khuyay,Любовь,Таптал,Dashuria,Amuri,ආදරය,Ljubezen,Jaceyl,خۆشەویستی,Љубав,Rakkaus,' +
        // 'Kärlek,Pag-ibig,காதல்,ప్రేమ,ความรัก,Ишқ,Aşk,محبت,Tình yêu,Higugma,ליבע').split(',');
	
      // nums.forEach(function(n) {
        // words.forEach(function(w) {
          // initWords.push(n + ' ' + w);
        // });
      // });

      //this.defaultWords = initWords.join('\n');
	  this.defaultWords = "武磊破门得分！在今天进行的西班牙人主场对阵赫塔菲的比赛中，\
	  武磊终于打破了新赛季西甲的进球荒，这个进球也帮助西班牙人在上半场结束前扳平了比分。\
	  在进球之前，武磊就已经有了两次有威胁的攻门。上半场临近结束时，\
	  在一次角球进攻中，前点的队友将球蹭到后点，武磊拍马赶到，抢在对方后卫之前将球垫进球网！\
	  这是武磊新赛季西甲的第一个进球，也是他在西甲联赛中的第4球。\
	  在本场比赛之前，武磊新赛季西甲还没有斩获，只是在欧联杯的比赛中有2球进账。\
	  阿云嘎这次登上巴黎时装周被网友称赞道，这造型都可以直接上去走秀了，\
	  可以说是很高的评价了，阿云嘎出生在内蒙古的鄂尔多斯，由于是蒙古族，\
	  小时候经常会在放羊的时候一展自己的歌手，草原上的声影纯洁又空灵，\
	  回荡在草原之中久久不息，小时候很会唱歌跳舞的阿云嘎，长大了高考时自然会选择舞蹈专业，\
	  于是阿云嘎确实选择了北京舞蹈学院，而且学的专业是音乐剧专业"
};
SourceDialogView.prototype = new View();
SourceDialogView.prototype.afterShow = function sdv_afterShow() {
  if (this.currentPanel) {
    this.currentPanel.show();
  }
};
SourceDialogView.prototype.handleEvent = function sd_handleEvent(evt) {
  var panelName;

  evt.preventDefault();
  if (evt.type == 'submit') {
    this.currentPanel.submit();
    return;
  }

  switch (evt.currentTarget) {
    case this.menuElement:
      panelName = evt.target.getAttribute('data-panel');
      if (!panelName || !this.panels[panelName]) {
        return;
      }

      this.showPanel(this.panels[panelName]);
      break;

    case this.selectionElement:
      panelName = evt.target.value;
      if (!panelName || !this.panels[panelName]) {
        return;
      }

      this.showPanel(this.panels[panelName]);
      break;

    case this.aboutBtnElement:
      this.app.switchUIState(this.app.UI_STATE_ABOUT_DIALOG);
      break;

    case this.startBtnElement:
      this.currentPanel.submit();
      break;
	  
	case this.cancelBtnElement:
	 this.app.switchUIState(this.app.UI_STATE_DASHBOARD);
	  break;
  }
};


SourceDialogView.prototype.autoSubmit = function sd_autoSubmit() {
	let words = 
	this.panels.cp.textareaElement.value = this.defaultWords;
  return this.app.pushUrlHash(
   '#base64:' + window.btoa(unescape(encodeURIComponent(this.defaultWords))));
};

SourceDialogView.prototype.submit = function sd_submit(hash) {
	
	// console.dir("hash: ")
	// console.dir(hash)
  return this.app.pushUrlHash(hash);
};
SourceDialogView.prototype.showPanel = function sd_showPanel(panel) {
  if (this.currentPanel) {
    this.currentPanel.hide();
  }

  panel.show();
  this.currentPanel = panel;
  if (this.app) {
    this.app.logAction('SourceDialogView::showPanel', panel.name);
  }
};
SourceDialogView.prototype.addPanel = function sd_addPanel(panel) {
  this.panels[panel.name] = panel;
  panel.menuItemElement =
    this.menuElement.querySelector('[data-panel="' + panel.name + '"]');
  panel.selectionIndex = Array.prototype.indexOf.call(
      this.menuElement.children, panel.menuItemElement.parentNode);

  if (!panel.menuItemElement) {
    throw 'menuItemElement not found.';
  }

  panel.menuItemElement.parentNode.removeAttribute('hidden');
  panel.dialog = this;

  if ('isSupported' in panel && !panel.isSupported) {
    panel.menuItemElement.parentNode.className += ' disabled';
    panel.menuItemElement.removeAttribute('data-panel');
    return;
  }

  if (!this.currentPanel) {
    this.showPanel(panel);
  }
};
