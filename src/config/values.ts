export default {
  dayOfTheWeek: {
    sunday: 'SUNDAY',
    monday: 'MONDAY',
    tuesday: 'TUESDAY',
    wednesday: 'WEDNESDAY',
    thursday: 'THURSDAY',
    friday: 'FRIDAY',
    saturday: 'SATURDAY',
    array: [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ],
  },
  user: {
    personType: {
      physics: 'PHYSICS',
      legal: 'LEGAL',
      array: ['PHYSICS', 'LEGAL'],
    },
    companySize: {
      autonomous: 'AUTONOMOUS',
      small: 'SMALL',
      medium: 'MEDIUM',
      large: 'LARGE',
      big: 'BIG',
      array: [
        'AUTONOMOUS' /* Para pessoas autônomas que prestam serviço, como uma empresa. */,
        'SMALL' /* Para empresas que possuem de 1 a 20 colaboradores */,
        'MEDIUM' /* Para empresas que possuem de 21 a 100 colaboradores */,
        'LARGE' /* Para empresas que possuem de 101 a 500 colaboradores */,
        'BIG' /* Para empresas que possuem acima de 500 colaboradores */,
      ],
    },
    role: {
      admin: 'ADMIN',
      customer: 'CUSTOMER',
      professional: 'PROFESSIONAL',
      array: ['ADMIN', 'CUSTOMER', 'PROFESSIONAL'],
    },
    status: {
      active: 'ACTIVE',
      inactive: 'INACTIVE',
      suspended: 'SUSPENDED',
      incomplete: 'INCOMPLETE',
      deleted: 'DELETED',
      array: [
        'ACTIVE' /* Usuário pode acessar e executar suas atividades */,
        'INACTIVE' /* Usuário não pode acessar mais o sistema */,
        'SUSPENDED' /* Usuário pode acessar mas não exerce as atividades */,
        'INCOMPLETE' /* Usuário com os dados incompletos (Não pode acessar, nem ser exibido como cliente) */,
        'DELETED' /* Usuário cancelou a conta, e após 30 dias (A partir do dia de cancelamento) o registro será deletado */,
      ],
    },
    sex: {
      male: 'MALE',
      female: 'FEMALE',
      other: 'OTHER',
      array: ['MALE', 'FEMALE', 'OTHER'],
    },
    typeGateway: {
      asaas: 'ASAAS',
      array: ['ASAAS'],
    },
  },
  recoverPassword: {
    status: {
      in_progress: 'IN_PROGRESS',
      released: 'RELEASED',
      array: ['IN_PROGRESS', 'RELEASED'],
    },
  },
  session: {
    type: {
      login: 'LOGIN',
      logout: 'LOGOUT',
      array: ['LOGIN', 'LOGOUT'],
    },
  },
};
