<?php

namespace App\Form;

use App\Entity\Session;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;


class SessionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('free', CheckboxType::class, [
                'required' => false
            ])
            ->add('dateStart', DateTimeType::class, [
                'html5' => true,
                'widget' => 'single_text',
                'format' => 'dd/MM/yyyy hh:mm aa',

            ])
            ->add('dateEnd', DateTimeType::class, [
                'required' => false,
                'html5' => true,
                'widget' => 'single_text',
                'format' => 'dd/MM/yyyy hh:mm aa',

            ])
            // ->add('flatRate')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Session::class,
        ]);
    }
}
