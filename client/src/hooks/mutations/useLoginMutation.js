import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '../../services/authService';

export const useLoginMutation = () => useMutation({ mutationFn: loginRequest });
