<?php

namespace App\Form;

use App\Entity\FlatRate;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FlaterateType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('sessionNumber')
            ->add('price')
            ->add('dateStart')
            ->add('dateEnd')
            // ->add('customer')
            // ->add('bill')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => FlatRate::class,
        ]);
    }
}
