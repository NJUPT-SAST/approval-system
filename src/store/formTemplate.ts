export const tempelate = [
  {
    type: 'object',
    labelWidth: 120,
    properties: {
      是否为STITP项目: {
        enum: ['是', '否'],
        type: 'string',
        title: '是否为STITP项目',
        widget: 'radio',
        required: true,
        enumNames: ['是', '否'],
        order: 1,
      },
      申报书: {
        type: 'string',
        widget: 'customUpload',
        title: '申报书',
        required: true,
        props: {
          inputName: '申报书',
          accept: '.pdf',
        },
        order: 2,
      },
      研究报告: {
        type: 'string',
        widget: 'customUpload',
        title: '研究报告',
        required: true,
        props: {
          inputName: '研究报告',
          accept: '.pdf',
        },
        order: 3,
      },
      作品简介书: {
        type: 'string',
        widget: 'customUpload',
        title: '作品简介书',
        required: true,
        props: {
          inputName: '作品简介书',
          accept: '.pdf',
        },
        order: 4,
      },
      作品名称: {
        type: 'string',
        props: {},
        title: '作品名称',
        required: true,
        order: 5,
      },
      作品类别: {
        enum: ['自然科学类学术论文', '哲学社会科学类社会调查报告和学术论文', '科技发明制作A类', '科技发明制作B类'],
        type: 'string',
        title: '作品类别',
        widget: 'select',
        required: true,
        enumNames: ['自然科学类学术论文', '哲学社会科学类社会调查报告和学术论文', '科技发明制作A类', '科技发明制作B类'],
        order: 6,
      },
      作品简介: {
        type: 'string',
        props: {},
        title: '作品简介',
        format: 'textarea',
        required: true,
        order: 7,
      },
    },
    displayType: 'column',
  },
  {
    "type": "object",
    "labelWidth": 120,
    "properties": {
      "作品名称": {
        "title": "作品名称",
        "type": "string",
        "required": true,
        "props": {},
        "order": 1
      },
      "作品类型": {
        "title": "作品类型",
        "type": "string",
        "enum": ["活动策划书", "项目企划书", "数字媒体作品"],
        "enumNames": ["活动策划书", "项目企划书", "数字媒体作品"],
        "widget": "radio",
        "required": true,
        "order": 2
      },
      "活动策划书": {
        "title": "活动策划书",
        "type": "string",
        "widget": "customUpload",
        "displayType": "column",
        "description": "限制word文档",
        "props": {
          "inputName": "活动策划书",
          "accept": ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        },
        "order": 3
      },
      "项目企划书": {
        "title": "项目企划书",
        "type": "string",
        "widget": "customUpload",
        "displayType": "column",
        "description": "限制word文档",
        "props": {
          "inputName": "项目企划书",
          "accept": ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        },
        "order": 4
      },
      "项目企划书现有成果资料附录": {
        "title": "项目企划书现有成果资料附录",
        "type": "string",
        "widget": "customUpload",
        "displayType": "column",
        "description": "限制压缩包",
        "props": { "inputName": "项目企划书现有成果资料附录", "accept": ".zip,.rar" },
        "order": 5
      },
      "数字媒体作品": {
        "title": "数字媒体作品",
        "type": "string",
        "widget": "customUpload",
        "displayType": "column",
        "description": "限制压缩包",
        "props": { "inputName": "数字媒体作品", "accept": ".zip,.rar" },
        "order": 6
      },
      "数字媒体作品说明书": {
        "title": "数字媒体作品说明书",
        "type": "string",
        "widget": "customUpload",
        "displayType": "column",
        "description": "限制word文档",
        "props": {
          "inputName": "数字媒体作品说明书",
          "accept": ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        },
        "order": 7
      },
      "数字媒体作品参考资料": {
        "title": "数字媒体作品参考资料",
        "type": "string",
        "widget": "customUpload",
        "displayType": "column",
        "description": "限制压缩包",
        "props": { "inputName": "数字媒体作品参考资料", "accept": ".zip,.rar" },
        "order": 8
      }
    },
    "displayType": "column"
  }
]
export const option = ['一号模板','公益创意模板']
