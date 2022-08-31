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
]
export const option = ['一号模板']
