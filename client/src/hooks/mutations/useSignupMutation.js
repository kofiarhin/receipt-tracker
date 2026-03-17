import { useMutation } from '@tanstack/react-query';
import { registerRequest } from '../../services/authService';

export const useSignupMutation = () => useMutation({ mutationFn: registerRequest });
