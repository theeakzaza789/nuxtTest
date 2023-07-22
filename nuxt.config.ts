export default defineNuxtConfig({

  // path: {
  //   env: resolve(__dirname, '../env/.env'),
  //   envDev: resolve(__dirname, '../env/.env.dev'),
  // },
  extends: [
    './ui',
    './apps/admin',
    './apps/auth',
  ],
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontaine',
  ],
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: {
        en: {
          app_name: 'THAI Bank Withdrawal System',
          app_description:
            'Simplify Bank Withdrawals',
          menu_dashboard: 'Dasboard',
          menu_fundstransfer_manual: 'Manual Funds Transfer',
          menu_child_fundstransfer_other_account: 'Funds Transfer Other',
          login: 'Login',
          invalid_data: 'Invalid data',
          login_success: 'Login Success',
          remember_me: 'Remember me',
          forgot_password: 'Forgot Password?',
          processing: 'Processing',
          completed: 'Completed',
          cancel: 'Cancelled',
          // -- start dashboard
          dashboard_account_no: 'Account No.',
          dashboard_available_balance: 'Balance',
          dashboard_account_name: 'Account Name',
          dashboard_account_bank: 'Bank Name',
          // -- end dashboard

          // ----fundstransfer_other_account
          funds_other_for_pin: 'For setting PIN / Change',
          funds_other_account_no: 'Account No',
          funds_other_txt_bank: 'Bank',
          funds_other_from_account: 'From Account',
          funds_other_to_account: 'Receiver Account',
          funds_other_to_account_placeholder: 'account no.',
          funds_other_to_account_bank: 'To Bank',
          funds_other_amount: 'Amount (THB)',
          funds_other_pin_for_transfer: '6 Digit PIN for transfers',
          funds_other_funds_transfer_automatic: 'Automatic',
          funds_other_funds_transfer_automatic_placeholder: 'Auto transfer when amount reach (ex. auto transfer when amount is 1,000THB)',
          funds_other_funds_transfer_immediately: 'immediately',
          funds_other_funds_transfer_add_automatic: 'Add to automatic transfer',
          funds_other_funds_transfer_add_automatic_warning: 'Warning: Minimum of Automatic transfer is 1,000THB and Maximum 100,000THB',
          funds_other_submit: 'Submit Transfer',
          funds_other_modal_header: 'Confirmation',
          funds_other_modal_button_confirm: 'Confirm',
          funds_other_modal_button_cancel: 'Cancel',

          funds_other_header_latest_transfer_transaction: 'Latest automatic transfer transaction',
          funds_other_latest_amount_react: 'Amount Reach Config',
          funds_other_latest_amount_transfer: 'amount transfer',
          funds_other_history_qr_code: 'QR Code',
          funds_other_latest_from_account: 'From Account',
          funds_other_latest_to_account: 'Receiver Account',
          funds_other_latest_provider: 'Provider',
          funds_other_latest_create_at: 'Create At',
          funds_other_latest_update_at: 'Update At',
          funds_other_history_header: 'Last 100 Transaction',
          funds_other_history_time: 'Time',
          funds_other_history_amount: 'Amount',
          funds_other_history_status: 'Status',
          funds_other_history_from: 'From Account',
          funds_other_history_to: 'Receiver Account',
          funds_other_history_provider: 'Provider',
          funds_other_history_cancel_button: 'Cancel',
          funds_other_history_confirm_button: 'Confirm',
          funds_other_history_cancel_transfer_header: 'Confirm, cancel transfer',
          bank_code_kbank: 'Kasikornbank',
          bank_code_bbl: 'Bangkok Bank',
          bank_code_ktb: 'Krung Thai Bank',
          bank_code_baac: 'Bank for Agriculture and Agricultural Cooperatives',
          bank_code_tmb: 'TMBThanachart Bank',
          bank_code_icbc: 'Industrial and Commercial Bank of China (Thai)',
          bank_code_tcd: 'The Thai Credit Retail Bank Public Company Limited',
          bank_code_citi: 'CITIBANK',
          bank_code_scbt: 'Standard Chartered Bank',
          bank_code_cimb: 'CIMB THAI BANK PUBLIC COMPANY LIMITED',
          bank_code_uob: 'NITED OVERSEAS BANK ',
          bank_code_bay: 'Krungsri Bank',
          bank_code_gsb: 'Government Savings Bank',
          bank_code_hsbc: 'HSBC Thailand',
          bank_code_mizuho: 'Mizuho Thailand Bank',
          bank_code_ghb: 'Government Housing Bank',
          bank_code_lhbank: 'LH Bank',
          bank_code_tbank: 'Thanachart Bank',
          bank_code_tisco: 'Tisco Bank ',
          bank_code_kk: 'KIATNAKIN PHATRA BANK',
          bank_code_scb: 'Siam Commercial Bank',
          bank_code_isbt: 'Islamic Bank of Thailand',
          funds_other_valid_account_from: 'Please enter an From Account ',
          funds_other_valid_account_to: 'Please enter an Receiver Account',
          funds_other_valid_to_bank: 'Please enter an Receiver Bank',
          funds_other_valid_pin: 'Please enter a 6 Digit PIN for transfer.',
          funds_other_valid_pin_must_6_char: 'PIN 6 Digits for transfer (Must be 6 character)',
          funds_other_valid: 'Please fill in',
          funds_other_valid_at_least_3_char: 'Must be at least 3 characters',
          funds_other_valid_amount_minimun: 'Amount Transfer Minimum is 1 THB',
          funds_other_valid_automatic_reach: 'auto transfer when amount reached Must be at least 1,000 THB',

          // ----fundstransfer_other_account

          // menu_store: 'Store',
          // menu_blog: 'Blog',
        },
        th: {
          app_name: 'THAI Bank Withdrawal System',
          app_description:
            'เรื่องโอนเงินเป็นเรื่องง่ายๆ',
          menu_dashboard: 'Dasboard',
          menu_fundstransfer_manual: 'ทำรายการ Manual',
          menu_child_fundstransfer_other_account: 'โอนเงินข้ามบัญชี ธนาคาร',
          login: 'เข้าสู่ระบบ',
          login_success: 'เข้าสู่ระบบสำเร็จ',
          invalid_data: 'ข้อมูลไม่ถูกต้อง',
          remember_me: 'จดจำรหัส',
          forgot_password: 'ลืมรหัสผ่าน?',
          processing: 'Processing',
          completed: 'Completed',
          cancel: 'Cancelled',
          // -- start dashboard
          dashboard_account_no: 'เลขบัญชี',
          dashboard_available_balance: 'ยอดเงินคงเหลือ',
          dashboard_account_name: 'ชื่อบัญชี',
          dashboard_account_bank: 'ชื่อธนาคาร',
          // -- end dashboard

          // ----fundstransfer_other_account
          funds_other_for_pin: 'สำหรับตั้ง PIN / เปลี่ยน',
          funds_other_account_no: 'เลขบัญชี',
          funds_other_txt_bank: 'ธนาคาร',
          funds_other_from_account: 'โอนจากบัญชี',
          funds_other_to_account: 'เลขบัญชีปลายทาง',
          funds_other_to_account_placeholder: 'เลขบัญชี',
          funds_other_to_account_bank: 'ธนาคารปลายทาง',
          funds_other_amount: 'จำนวนเงินที่ต้องการโอน',
          funds_other_pin_for_transfer: 'PIN 6 หลักสำหรับโอนเงิน',
          funds_other_funds_transfer_automatic: 'เพิ่มไปยังรายการโอนอัตโนมัติ',
          funds_other_funds_transfer_automatic_placeholder: 'เมื่อยอดเงินคงเหลือมากกว่าหรือเท่า ระบบถึงจะเริ่มโอนเงินตามตั้งค่า (จำนวนเงินที่ต้องการโอน)',
          funds_other_funds_transfer_immediately: 'โอนทันที',
          funds_other_funds_transfer_add_automatic: 'เพิ่มไปยังรายการโอนอัตโนมัติ',
          funds_other_funds_transfer_add_automatic_warning: 'หากเลือกเพิ่มไปยังรายการโอนอัตโนมัติ จำนวนเงินที่ต้องการโอนขั้นต่ำ 1,000 สูงสุด 100,000',
          funds_other_submit: 'จำนวนเงินที่ต้องการโอน',
          funds_other_modal_header: 'Confirmation',
          funds_other_modal_button_confirm: 'Confirm',
          funds_other_modal_button_cancel: 'Cancel',

          funds_other_header_latest_transfer_transaction: 'รายการโอนอัตโนมัติ',
          funds_other_latest_amount_react: 'โอนเงินเมื่อยอดเงินถึง',
          funds_other_latest_amount_transfer: 'โอนเงินจำนวน',
          funds_other_latest_from_account: 'บัญชีต้นทาง',
          funds_other_history_qr_code: 'QR Code',
          funds_other_latest_to_account: 'บัญชีปลายทาง',
          funds_other_latest_provider: 'ผู้ดำเนินการ',
          funds_other_latest_create_at: 'เวลาสร้าง',
          funds_other_latest_update_at: 'เวลาอัพเดต',
          funds_other_history_header: 'ประวัติโอนเงิน 100 รายการล่าสุด',
          funds_other_history_time: 'เวลา',
          funds_other_history_amount: 'จำนวน',
          funds_other_history_status: 'สถานะ',
          funds_other_history_from: 'บัญชีปลายทาง',
          funds_other_history_to: 'บัญชีต้นทาง',
          funds_other_history_provider: 'ผู้ดำเนินการ',
          funds_other_history_cancel_button: 'ยกเลิก',
          funds_other_history_confirm_button: 'ยืนยัน',
          funds_other_history_cancel_transfer_header: 'ยืนยันยกเลิกรายการโอนเงิน',
          bank_code_kbank: 'ธนาคารกสิกรไทย',
          bank_code_bbl: 'ธนาคารกรุงเทพ',
          bank_code_ktb: 'ธนาคารกรุงไทย',
          bank_code_baac: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร',
          bank_code_tmb: 'ธนาคารทหารไทยธนชาต',
          bank_code_icbc: 'ธนาคารไอซีบีซี (ไทย)',
          bank_code_tcd: 'ธนาคารไทยเครดิตเพื่อรายย่อย',
          bank_code_citi: 'ธนาคารซิตี้แบงก์',
          bank_code_scbt: 'ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)',
          bank_code_cimb: 'ธนาคารซีไอเอ็มบีไทย',
          bank_code_uob: 'ธนาคารยูโอบี',
          bank_code_bay: 'ธนาคารกรุงศรีอยุธยา',
          bank_code_gsb: 'ธนาคารออมสิน',
          bank_code_hsbc: 'ธนาคารเอชเอสบีซี ประเทศไทย',
          bank_code_mizuho: 'ธนาคารมิซูโฮ คอร์ปอเรต',
          bank_code_ghb: 'ธนาคารอาคารสงเคราะห์',
          bank_code_lhbank: 'ธนาคารแลนด์ แอนด์ เฮ้าส์',
          bank_code_tbank: 'ธนาคารธนชาต',
          bank_code_tisco: 'ธนาคารทิสโก้',
          bank_code_kk: 'ธนาคารเกียรตินาคิน',
          bank_code_scb: 'ธนาคารไทยพาณิชย์',
          bank_code_isbt: 'ธนาคารอิสลามแห่งประเทศไทย',
          funds_other_valid_account_from: 'กรุณากรอก โอนจากบัญชี',
          funds_other_valid_account_to: 'กรุณากรอก เลขบัญชีปลายทาง',
          funds_other_valid_to_bank: 'กรุณากรอก ธนาคารปลายทาง',
          funds_other_valid_pin: 'กรุณากรอก PIN 6 หลักสำหรับโอนเงิน',
          funds_other_valid_pin_must_6_char: 'PIN 6 หลักสำหรับโอนเงิน ต้องมีความยาว 6',
          funds_other_valid: 'กรุณากรอกข้อมูล',
          funds_other_valid_at_least_3_char: 'ต้องมีอย่างน้อย 3 ตัวอักษร',
          funds_other_valid_amount_minimun: 'จำนวนเงินที่ต้องการโอน ต้องมีค่าตั้งแต่ 1 ขึ้นไป',
          funds_other_valid_automatic_reach: 'โอนเงินเมื่อยอดเงินถึง ต้องมีค่าตั้งแต่ 1000 ขึ้นไป',

          // ----fundstransfer_other_account

          // menu_store: 'Toko',
          // menu_blog: 'Blog',
        },
      },
    },
    // vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      API_URL: process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.API_URL,
      API_KEY: process.env.NODE_ENV === 'production' ? process.env.API_KEY : process.env.API_KEY,
      API_SHOCK_URL: process.env.NODE_ENV === 'production' ? process.env.API_SHOCK_URL : process.env.API_SHOCK_URL,
      gaId: 'test',
    },
  },
  googleFonts: {
    prefetch: true,
    preconnect: true,
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  content: {
    highlight: {
      theme: {
        default: 'github-dark',
      },
    },
    preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini'],
  },
  build: {
    // vue-toastification - old commonjs module
    transpile: ['vue-toastification'],
  },
})
