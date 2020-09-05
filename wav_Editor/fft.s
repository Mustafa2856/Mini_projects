	.file	"fft.c"
	.text
	.p2align 4,,15
	.globl	fft
	.type	fft, @function
fft:
.LFB23:
	.cfi_startproc
	rep ret
	.cfi_endproc
.LFE23:
	.size	fft, .-fft
	.section	.rodata.str1.1,"aMS",@progbits,1
.LC0:
	.string	"rb"
.LC1:
	.string	"Faded.wav"
	.section	.text.startup,"ax",@progbits
	.p2align 4,,15
	.globl	main
	.type	main, @function
main:
.LFB24:
	.cfi_startproc
	pushq	%rbx
	.cfi_def_cfa_offset 16
	.cfi_offset 3, -16
	leaq	.LC0(%rip), %rsi
	leaq	.LC1(%rip), %rdi
	subq	$64, %rsp
	.cfi_def_cfa_offset 80
	movq	%fs:40, %rax
	movq	%rax, 56(%rsp)
	xorl	%eax, %eax
	call	fopen@PLT
	leaq	16(%rsp), %rdi
	movq	%rax, %rcx
	movl	$40, %edx
	movl	$1, %esi
	movq	%rax, %rbx
	call	fread@PLT
	leaq	12(%rsp), %rdi
	movq	%rbx, %rcx
	movl	$1, %edx
	movl	$4, %esi
	call	fread@PLT
	movl	12(%rsp), %ecx
	leaq	data(%rip), %rdi
	movq	%rbx, %r8
	movl	$4, %edx
	movl	$40000000, %esi
	sarl	$2, %ecx
	movl	%ecx, 12(%rsp)
	movslq	%ecx, %rcx
	call	__fread_chk@PLT
	movl	12(%rsp), %eax
	testl	%eax, %eax
	jle	.L4
	subl	$1, %eax
	leaq	data(%rip), %rdi
	leaq	left(%rip), %rsi
	leaq	right(%rip), %rcx
	leaq	2(%rax,%rax), %r8
	xorl	%eax, %eax
	.p2align 4,,10
	.p2align 3
.L5:
	movl	(%rdi,%rax,2), %edx
	movw	%dx, (%rsi,%rax)
	sarl	$16, %edx
	movw	%dx, (%rcx,%rax)
	addq	$2, %rax
	cmpq	%rax, %r8
	jne	.L5
.L4:
	xorl	%eax, %eax
	movq	56(%rsp), %rbx
	xorq	%fs:40, %rbx
	jne	.L9
	addq	$64, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 16
	popq	%rbx
	.cfi_def_cfa_offset 8
	ret
.L9:
	.cfi_restore_state
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE24:
	.size	main, .-main
	.comm	dft,79986688,32
	.comm	right,20000000,32
	.comm	left,20000000,32
	.comm	data,40000000,32
	.ident	"GCC: (Ubuntu 7.5.0-3ubuntu1~18.04) 7.5.0"
	.section	.note.GNU-stack,"",@progbits
