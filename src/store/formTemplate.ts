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
        max: 500,
        order: 7,
      },
    },
    displayType: 'column',
  },
  {
    type: 'object',
    labelWidth: 120,
    properties: {
      作品名称: {
        title: '作品名称',
        type: 'string',
        required: true,
        props: {},
        order: 1,
      },
      作品类型: {
        title: '作品类型',
        type: 'string',
        enum: ['活动策划书', '项目企划书', '数字媒体作品'],
        enumNames: ['活动策划书', '项目企划书', '数字媒体作品'],
        widget: 'radio',
        required: true,
        order: 2,
      },
      活动策划书: {
        title: '活动策划书',
        type: 'string',
        widget: 'customUpload',
        displayType: 'column',
        description: '限制word文档',
        props: {
          inputName: '活动策划书',
          accept:
            '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
        order: 3,
      },
      项目企划书: {
        title: '项目企划书',
        type: 'string',
        widget: 'customUpload',
        displayType: 'column',
        description: '限制word文档',
        props: {
          inputName: '项目企划书',
          accept:
            '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
        order: 4,
      },
      项目企划书现有成果资料附录: {
        title: '项目企划书现有成果资料附录',
        type: 'string',
        widget: 'customUpload',
        displayType: 'column',
        description: '限制压缩包',
        props: { inputName: '项目企划书现有成果资料附录', accept: '.zip,.rar' },
        order: 5,
      },
      数字媒体作品: {
        title: '数字媒体作品',
        type: 'string',
        widget: 'customUpload',
        displayType: 'column',
        description: '限制压缩包',
        props: { inputName: '数字媒体作品', accept: '.zip,.rar' },
        order: 6,
      },
      数字媒体作品说明书: {
        title: '数字媒体作品说明书',
        type: 'string',
        widget: 'customUpload',
        displayType: 'column',
        description: '限制word文档',
        props: {
          inputName: '数字媒体作品说明书',
          accept:
            '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
        order: 7,
      },
      数字媒体作品参考资料: {
        title: '数字媒体作品参考资料',
        type: 'string',
        widget: 'customUpload',
        displayType: 'column',
        description: '限制压缩包',
        props: { inputName: '数字媒体作品参考资料', accept: '.zip,.rar' },
        order: 8,
      },
    },
    displayType: 'column',
  },
  {
    type: 'object',
    labelWidth: 120,
    properties: {
      学院: {
        enum: [
          '通信与信息工程学院',
          '电子与光学工程学院、柔性电子 （未来技术）学院',
          '集成电路科学与工程学院',
          '计算机学院、软件学院、网络空间安全学院',
          '信息材料与纳米技术研究院、材料科学与工程学院',
          '自动化学院、人工智能学院',
          '材料与工程学院',
          '化学与生命科学学院',
          '物联网学院',
          '现代邮政学院',
          '传媒与艺术学院',
          '管理学院',
          '经济学院',
          '马克思主义学院',
          '社会与人口学院',
          '外国语学院',
          '教育科学与技术学院',
          '贝尔英才学院',
          '海外教育学院',
        ],
        type: 'string',
        title: '学院',
        widget: 'select',
        required: true,
        enumNames: [
          '通信与信息工程学院',
          '电子与光学工程学院、柔性电子 （未来技术）学院',
          '集成电路科学与工程学院',
          '计算机学院、软件学院、网络空间安全学院',
          '信息材料与纳米技术研究院、材料科学与工程学院',
          '自动化学院、人工智能学院',
          '材料与工程学院',
          '化学与生命科学学院',
          '物联网学院',
          '现代邮政学院',
          '传媒与艺术学院',
          '管理学院',
          '经济学院',
          '马克思主义学院',
          '社会与人口学院',
          '外国语学院',
          '教育科学与技术学院',
          '贝尔英才学院',
          '海外教育学院',
        ],
        order: 1,
      },
      作品名称: { type: 'string', props: {}, title: '项目名称', required: true, order: 2 },
      项目组别: {
        enum: [
          'A.科技创新和未来产业',
          'B.乡村振兴和农业农村现代化',
          'C.社会治理和公共服务',
          'D.生态环保和可持续发展',
          'E.文化创意和区域合作',
        ],
        type: 'string',
        title: '项目组别',
        widget: 'select',
        required: true,
        enumNames: [
          'A.科技创新和未来产业',
          'B.乡村振兴和农业农村现代化',
          'C.社会治理和公共服务',
          'D.生态环保和可持续发展',
          'E.文化创意和区域合作',
        ],
        order: 3,
      },
      指导老师姓名: { type: 'string', props: {}, title: '指导老师姓名', required: true, order: 4 },
      指导老师工号: { type: 'string', props: {}, title: '指导老师工号', required: true, order: 5 },
      项目简介: {
        type: 'string',
        props: {},
        title: '项目简介',
        format: 'textarea',
        required: true,
        order: 6,
      },
      项目申报书: {
        type: 'string',
        widget: 'customUpload',
        title: '项目申报书',
        required: true,
        props: { inputName: '项目申报书', accept: '.doc,.docx' },
        order: 7,
      },
      创业计划书: {
        type: 'string',
        widget: 'customUpload',
        title: '创业计划书',
        required: true,
        props: { inputName: '创业计划书', accept: '.pdf' },
        order: 8,
      },
      '项目 PPT': {
        type: 'string',
        widget: 'customUpload',
        title: '项目 PPT',
        required: true,
        props: { inputName: '项目 PPT', accept: '.ppt,.pptx' },
        order: 9,
      },
    },
    displayType: 'column',
  },
]
export const option = ['创新杯模板', '公益创意模板', '挑战杯模板']
