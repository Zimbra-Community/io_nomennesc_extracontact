function io_nomennesc_extracontact_HandlerObject() {
  io_nomennesc_extracontact_HandlerObject.settings = {};
  this._appView = void 0;
}

io_nomennesc_extracontact_HandlerObject.prototype = new ZmZimletBase();
io_nomennesc_extracontact_HandlerObject.prototype.constructor = io_nomennesc_extracontact_HandlerObject;
var extraContact = io_nomennesc_extracontact_HandlerObject;
var fields;

extraContact.prototype.init =
  function () {
	AjxDispatcher.require(["Contacts"]);
	AjxDispatcher.require(["ContactsCore"]);
	var fieldsconfig = JSON.parse(this._zimletContext.getConfig("extracontact_field"));
	fields = fieldsconfig["fields"];
        for(var i=0;i<fields.length;i++) {
                field=fields[i];
		ZmMsg[field.id] = field.msg;
		ZmMsg[field.id + "Label"] = field.label;
		ZmContact["F_" + field.id] = field.id;
		ZmContact.PRIMARY_FIELDS.push(ZmContact["F_" + field.id]);
		ZmContact._AB_FIELD[field.id] = ZmMsg[field.id];
		ZmEditContactView.ATTRS[field.id.toUpperCase()] = ZmContact["F_" + field.id];
        }
	if(ZmEditContactView){

ZmEditContactView.prototype.getFormItems = function() {
        if (!this._formItems) {
                this._formItems = [
                        // debug
        //                      { id: "DEBUG", type: "DwtText", ignore:true },
                        // header pseudo-items
                        { id: "FULLNAME", type: "DwtText", className: "contactHeader",
                                getter: this._getFullName, ignore: true },
                        // contact attribute fields
                        { id: "IMAGE", type: "ZmEditContactViewImage" },
                        { id: "ZIMLET_IMAGE", type: "DwtText" },
                        { id: "PREFIX", type: "DwtInputField", width: 38, tooltip: ZmMsg.namePrefix, hint: ZmMsg.AB_FIELD_prefix, visible: "get('SHOW_PREFIX')" },
                        { id: "FIRST", type: "DwtInputField", width: 95, tooltip: ZmMsg.firstName, hint: ZmMsg.AB_FIELD_firstName, visible: "get('SHOW_FIRST')", onblur: "this._controller.updateTabTitle()" },
                        { id: "MIDDLE", type: "DwtInputField", width: 95, tooltip: ZmMsg.middleName, hint: ZmMsg.AB_FIELD_middleName, visible: "get('SHOW_MIDDLE')" },
                        { id: "MAIDEN", type: "DwtInputField", width: 95, tooltip: ZmMsg.maidenName, hint: ZmMsg.AB_FIELD_maidenName, visible: "get('SHOW_MAIDEN')" },
                        { id: "LAST", type: "DwtInputField", width: 95, tooltip: ZmMsg.lastName, hint: ZmMsg.AB_FIELD_lastName, visible: "get('SHOW_LAST')" , onblur: "this._controller.updateTabTitle()"},
                        { id: "SUFFIX", type: "DwtInputField", width: 38, tooltip: ZmMsg.nameSuffix, hint: ZmMsg.AB_FIELD_suffix, visible: "get('SHOW_SUFFIX')" },
                        { id: "NICKNAME", type: "DwtInputField", width: 66, hint: ZmMsg.AB_FIELD_nickname, visible: "get('SHOW_NICKNAME')" },
                        { id: "COMPANY", type: "DwtInputField", width: 209, hint: ZmMsg.AB_FIELD_company, visible: "get('SHOW_COMPANY')", onblur: "this._controller.updateTabTitle()" },
                        { id: "TITLE", type: "DwtInputField", width: 209, hint: ZmMsg.AB_FIELD_jobTitle, visible: "get('SHOW_TITLE')" },
                        { id: "DEPARTMENT", type: "DwtInputField", width: 209, hint: ZmMsg.AB_FIELD_department, visible: "get('SHOW_DEPARTMENT')" },
                        { id: "NOTES", type: "DwtInputField", hint: ZmMsg.notes, width: "47em", rows:4 },
            // phonetic name fields
            { id: "PHONETIC_PREFIX", visible: "this.isVisible('PREFIX')", ignore:true },
            { id: "PHONETIC_FIRST", type: "DwtInputField", width: 95, hint: ZmMsg.AB_FIELD_phoneticFirstName, visible: "this.isVisible('FIRST')" },
            { id: "PHONETIC_MIDDLE", visible: "this.isVisible('MIDDLE')", ignore:true },
            { id: "PHONETIC_MAIDEN", visible: "this.isVisible('MAIDEN')", ignore:true },
            { id: "PHONETIC_LAST", type: "DwtInputField", width: 95, hint: ZmMsg.AB_FIELD_phoneticLastName, visible: "this.isVisible('LAST')" },
            { id: "PHONETIC_SUFFIX", visible: "this.isVisible('SUFFIX')", ignore:true },
            { id: "PHONETIC_COMPANY", type: "DwtInputField", width: 209, hint: ZmMsg.AB_FIELD_phoneticCompany, visible: "this.isVisible('COMPANY')" },
                        // contact list fields
                        { id: "EMAIL", type: "ZmEditContactViewInputSelectRows", rowitem: {
                                type: "ZmEditContactViewInputSelect", equals:ZmEditContactViewInputSelect.equals, params: {
                                        inputWidth: 352, tooltip: ZmMsg.email, hint: ZmMsg.emailAddrHint, options: this.getEmailOptions()
                                }
                        }, validator: ZmEditContactView.emailValidator },
                        { id: "PHONE", type: "ZmEditContactViewInputSelectRows", rowitem: {
                                type: "ZmEditContactViewInputSelect", equals:ZmEditContactViewInputSelect.equals, params: {
                                        inputWidth: 351, tooltip: ZmMsg.phone, hint: ZmMsg.phoneNumberHint, options: this.getPhoneOptions()
                                }
                        } },
                        { id: "IM", type: "ZmEditContactViewInputSelectRows", rowitem: {
                                type: "ZmEditContactViewIM", equals: ZmEditContactViewIM.equals, params: {
                                        inputWidth: 351, tooltip: ZmMsg.imShort, hint: ZmMsg.imScreenNameHint, options: this.getIMOptions()
                                }
                        } },
                        { id: "ADDRESS", type: "ZmEditContactViewInputSelectRows",
                                rowtemplate: "abook.Contacts#ZmEditContactViewAddressRow",
                                rowitem: { type: "ZmEditContactViewAddress", equals: ZmEditContactViewAddress.equals,
                                        params: { options: this.getAddressOptions() }
                                }
                        },
                        { id: "URL", type: "ZmEditContactViewInputSelectRows", rowitem: {
                                type: "ZmEditContactViewInputSelect", equals:ZmEditContactViewInputSelect.equals, params: {
                                        inputWidth: 351, hint: ZmMsg.url, options: this.getURLOptions()
                                }
                        } },
                        { id: "OTHER", type: "ZmEditContactViewInputSelectRows", rowitem: {
                                type: "ZmEditContactViewOther", equals:ZmEditContactViewInputSelect.equals, params: {
                                        inputWidth: 300,
                                        selectInputWidth: 112,
                                        hint: ZmMsg.date,
                                        options: this.getOtherOptions()
                                }
                        }, validator: ZmEditContactViewOther.validator },
                        // other controls
                        { id: "DETAILS", type: "DwtButton",
                                label: "\u00BB", // &raquo;
                                tooltip: ZmMsg.chooseFields,
                                ignore:true,
                                className: "ZmEditContactViewDetailsButton",
                                template: "abook.Contacts#ZmEditContactViewDetailsButton",
                                onblur: "this._controller.updateTabTitle()"
                        },
                        { id: "FILE_AS", type: "DwtSelect", onchange: this._handleFileAsChange, items: this.getFileAsOptions(), tooltip: ZmMsg.fileAs },
                        { id: "FOLDER", type: "DwtButton", image: "ContactsFolder", imageAltText: ZmMsg.location, tooltip: ZmMsg.location,
                                enabled: "this._contact && !this._contact.isReadOnly()",
                                onclick: this._handleFolderButton
                        },
                        { id: "TAG", type: "DwtControl",
                                enabled: "this._contact && !this._contact.isShared()",
                                visible: "appCtxt.get(ZmSetting.TAGGING_ENABLED)"
                        },
                        { id: "ACCOUNT", type: "DwtLabel",
                                visible: "appCtxt.multiAccounts"
                        },
                        // NOTE: Return false onclick to prevent default action
                        { id: "VIEW_IMAGE", ignore: true, onclick: "open(get('IMAGE')) && false", visible: "get('IMAGE')" },
                        { id: "REMOVE_IMAGE", ignore: true, onclick: this._handleRemoveImage, visible: "get('IMAGE')" },
                        // pseudo-items
                        { id: "JOB", notab: true, ignore:true, visible: "get('SHOW_TITLE') && get('SHOW_DEPARTMENT')" },
                        { id: "TITLE_DEPARTMENT_SEP", notab: true,
                                ignore:true, visible: "get('SHOW_TITLE') && get('SHOW_DEPARTMENT')"
                        }
                ];
		for(var i=0;i<fields.length;i++) { 
			field=fields[i];
			var item = new Object();
			item.id=field.id.toUpperCase();
			item.type=field.type;
			item.hint=ZmMsg[field.id];
			item.width=field.width;
			item.rows=parseInt(field.rows);
			this._formItems.push(item);
		}
        }
        return this._formItems;
};

for(var i=0;i<fields.length;i++) {
        field=fields[i];
	ZmContactSplitView["showContact" + field.id.charAt(0).toUpperCase() + field.id.slice(1)] = 
	function(data) {
        	var itemListData = ZmContactSplitView._getListData(data, ZmMsg[field.id + "Label"]);
        	itemListData.encode = AjxStringUtil.nl2br;
        	itemListData.name = ZmContact["F_" + field.id];
        	itemListData.names = [ZmContact["F_" + field.id]];
        	return ZmContactSplitView._showContactListItem(itemListData);
	};
}

AjxTemplate.register("abook.Contacts#SplitView_content",
function(name, params, data, buffer) {
        var _hasBuffer = Boolean(buffer);
        data = (typeof data == "string" ? { id: data } : data) || {};
        buffer = buffer || [];
        var _i = buffer.length;

        buffer[_i++] = "<table id='";
        buffer[_i++] = data["id"];
        buffer[_i++] = "_details' class='contactContentTable'>";
        buffer[_i++] =  AjxTemplate.expand("abook.Contacts#SplitView_header", data) ;
        buffer[_i++] =  ZmContactSplitView.showContactEmails(data) ;
        buffer[_i++] =  ZmContactSplitView.showContactPhones(data) ;
        buffer[_i++] =  ZmContactSplitView.showContactIMs(data) ;
        buffer[_i++] =  ZmContactSplitView.showContactAddresses(data) ;
        buffer[_i++] =  ZmContactSplitView.showContactUrls(data) ;
        buffer[_i++] =  ZmContactSplitView.showContactOther(data) ;
        buffer[_i++] =  ZmContactSplitView.showContactNotes(data) ;
	for(var i=0;i<fields.length;i++) {
		field=fields[i];
        	buffer[_i++] =  ZmContactSplitView["showContact" + field.id.charAt(0).toUpperCase() + field.id.slice(1)](data) ;
	}
        buffer[_i++] =  ZmContactSplitView.showContactDLMembers(data) ;
        buffer[_i++] = "</table>";

        return _hasBuffer ? buffer.length : buffer.join("");
},
{
        "id": "abook.Contacts#SplitView_content"
}, false);

AjxTemplate.register("abook.Contacts#ZmEditContactView_body",
function(name, params, data, buffer) {
        var _hasBuffer = Boolean(buffer);
        data = (typeof data == "string" ? { id: data } : data) || {};
        buffer = buffer || [];
        var _i = buffer.length;

        buffer[_i++] = "<tr><td class=rowLabel>";
        buffer[_i++] = ZmMsg.emailLabel;
        buffer[_i++] = "</td><td class=rowValue><div id='";
        buffer[_i++] = data["id"];
        buffer[_i++] = "_EMAIL' tabindex='500'></div></td></tr><tr><td class=rowLabel>";
        buffer[_i++] = ZmMsg.phoneLabel;
        buffer[_i++] = "</td><td class=rowValue><div id='";
        buffer[_i++] = data["id"];
        buffer[_i++] = "_PHONE' tabindex='600'></div></td></tr><tr><td class=rowLabel>";
        buffer[_i++] = ZmMsg.imLabel;
        buffer[_i++] = "</td><td class=rowValue><div id='";
        buffer[_i++] = data["id"];
        buffer[_i++] = "_IM' tabindex='700'></div></td></tr><tr><td class=rowLabel>";
        buffer[_i++] = ZmMsg.addressLabel;
        buffer[_i++] = "</td><td class=rowValue><div id='";
        buffer[_i++] = data["id"];
        buffer[_i++] = "_ADDRESS' tabindex='800'></div></td></tr><tr><td class=rowLabel>";
        buffer[_i++] = ZmMsg.urlLabel;
        buffer[_i++] = "</td><td class=rowValue><div id='";
        buffer[_i++] = data["id"];
        buffer[_i++] = "_URL' tabindex='900'></div></td></tr><tr><td class=rowLabel>";
        buffer[_i++] = ZmMsg.otherLabel;
        buffer[_i++] = "</td><td class=rowValue><div id='";
        buffer[_i++] = data["id"];
        buffer[_i++] = "_OTHER' tabindex='1000'></div></td></tr><tr><td class=rowLabel>";
        buffer[_i++] = ZmMsg.notesLabel;
        buffer[_i++] = "</td><td class=rowValue><div id='";
        buffer[_i++] = data["id"];
        buffer[_i++] = "_NOTES' tabindex='1100'></div></td></tr>";
        for(var i=0;i<fields.length;i++) {
                field=fields[i];
		buffer[_i++] = "<tr><td class=rowLabel>";
        	buffer[_i++] = ZmMsg[field.id + "Label"];
        	buffer[_i++] = "</td><td class=rowValue><div id='";
        	buffer[_i++] = data["id"];
		var tabindex = 1200 + i*100;
        	buffer[_i++] = "_" + field.id.toUpperCase() + "' tabindex='" + tabindex.toString() + "'></div></td></tr>";
	}
        return _hasBuffer ? buffer.length : buffer.join("");
},
{
        "id": "abook.Contacts#ZmEditContactView_body"
}, false);


};
};
